import * as esbuild from 'esbuild';
import { builtinModules } from 'module';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const external = [...builtinModules, 'sequelize', 'pg', 'bcrypt'];

const distDbDir = path.join(__dirname, 'dist/db');
if (fs.existsSync(distDbDir)) {
  fs.rmSync(distDbDir, { recursive: true });
}
fs.mkdirSync(distDbDir, { recursive: true });
fs.mkdirSync(path.join(distDbDir, 'migrations'), { recursive: true });

await esbuild.build({
  entryPoints: ['src/infrastructure/db/config.ts'],
  outfile: 'dist/db/config.js',
  platform: 'node',
  external: external,
  bundle: true,
  format: 'cjs',
});

const migrationsDir = path.join(__dirname, 'src/infrastructure/db/migrations');
const migrationFiles = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.ts'));

for (const file of migrationFiles) {
  await esbuild.build({
    entryPoints: [path.join(migrationsDir, file)],
    outfile: path.join(distDbDir, 'migrations', file.replace('.ts', '.js')),
    platform: 'node',
    external: external,
    bundle: true,
    format: 'cjs',
  });
}

console.log('✓ Database migrations and config compiled successfully');
