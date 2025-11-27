import { Sequelize, Model, Attributes, Transaction, Options, ModelStatic, Op } from 'sequelize';

export * from 'sequelize';

export type ModelFields<T extends Model> = Partial<Attributes<T>>;

type AssociationFn = (models: Record<string, ModelStatic<any>>)=>void;
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export async function plainify<
  T extends(Model | Promise<Model> | Model[] | Promise<Model[]> | null | unknown),
  M = T extends (Model | Model[] | (Model | null)) ? T :
  T extends Promise<Model | Model[] | (Model | null)> ? Awaited<T> :
  unknown
>(object:T):Promise<
  M extends Model ? Attributes<M> :
  M extends Model[] ? Attributes<ArrayElement<M>>[] : M
> {
  const model = await object;
  const toPlain = (value: any) => (value?.toJSON && value.toJSON()) || value;
  return Array.isArray(model)
    ? model.map((m) => toPlain(m)) as any
    : toPlain(model);
}

const metadataOperatorsMap = {
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $ne: Op.ne,
  $or: Op.or,
  $gt: Op.gt,
  $lt: Op.lt,
  $gte: Op.gte,
  $lte: Op.lte,
  $iLike: Op.iLike,
  $like: Op.like,
};
export function metadataQuery(metadata:Record<string, any>) {
  const replaceOperators = (obj: any): any => Object.entries(obj).reduce((res: any, [key, value]) => {
    res[(metadataOperatorsMap as any)[key] || key] = (value && typeof value === 'object')
      ? (Array.isArray(value))
        ? value.map((v) => ((v && typeof v === 'object' && !Array.isArray(v)) ? replaceOperators(v) : v))
        : replaceOperators(value)
      : value;
    return res;
  }, {});
  return replaceOperators(metadata);
}
export class SequelizeDB {
  #associationFnList:AssociationFn[] = [];

  instance:Sequelize;

  constructor(config:Options) {
    this.instance = new Sequelize(config);
  }

  associate(fn:AssociationFn) {
    this.#associationFnList.push(fn);
  }

  async connectDatabase() {
    try {
      this.#associationFnList.forEach((fn) => {
        fn(this.instance.models);
      });
      await this.instance.authenticate();
    } catch (err) {
      if (err instanceof Error) {
        err.message += 'Database connection error: ';
      }
      throw err;
    }
  }

  runInTransaction<T>(callback:(t: Transaction) => PromiseLike<T>): Promise<T> {
    return this.instance.transaction(callback);
  }

}
