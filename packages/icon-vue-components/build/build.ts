/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: esbuild打包
 */
import path from 'node:path'
import { build } from 'esbuild'
import vue from 'unplugin-vue/esbuild'
import { emptyDir } from 'fs-extra'
import type { BuildOptions, Format } from 'esbuild'
import { version } from '../package.json'
import { pathOutput, pathSrc } from './paths'

const buildBundle = async () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      entryPoints: [
        path.resolve(pathSrc, 'index.ts'),
        path.resolve(pathSrc, 'global.ts')
      ],
      target: 'es2018',
      platform: 'neutral',
      plugins: [
        vue({
          isProduction: true
        })
      ],
      bundle: true,
      format,
      minifySyntax: true,
      banner: {
        js: `/*! JT Icon Vue Components v${version} */\n`
      },
      outdir: pathOutput
    }
    options.external = ['vue']
    return options
  }
  const doBuild = async (minify: boolean) => {
    await Promise.all([
      build({
        ...getBuildOptions('esm'),
        entryNames: `[name]${minify ? '.min' : ''}`,
        minify,
        sourcemap: minify
      })
    ])
  }

  return Promise.all([doBuild(true), doBuild(false)])
}

console.log('清空 dist...')
await emptyDir(pathOutput)
console.log('打包...')
await buildBundle()
