import * as esbuild from 'esbuild';
import ImportGlobPlugin from 'esbuild-plugin-import-glob';
import { builtinModules } from 'module';
import chalk from 'chalk';

const isWatch = process.argv[2] === '--watch';

const external = [
  ...builtinModules,
  'sequelize',
  'pg',
  'bcrypt',
]

if (isWatch) {
  const ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    platform: 'node',
    external: external,
    sourcemap: true,
    bundle: true,
    plugins: [
      ImportGlobPlugin.default(),
      rebuildLogPlugin(),
    ],
  });

  print('Watching for app source files...');
  await ctx.watch()
}

function rebuildLogPlugin() {
  return {
    name: 'rebuild-logs',
    setup(build) {
      build.onStart(() => print('Source files changed, rebuilding...'))
      build.onEnd(() => print('Rebuilding done.'))
    },
  };
}

function print(message) {
  console.log(chalk.gray(`[esbuild-backend] ${message}`));
}
