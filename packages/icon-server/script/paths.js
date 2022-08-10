/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 获取关键文件的绝对路径
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const pathSvg = 'static/svg'
const dir = dirname(fileURLToPath(import.meta.url))
const pathRoot = resolve(dir, '..')
const pathGit = resolve(pathRoot, '../..')
const pathPackageJson = resolve(
  pathRoot,
  '..',
  'icon-vue-components/package.json'
)
const pathStaticSvg = resolve(pathRoot, pathSvg)

export { pathSvg, pathRoot, pathGit, pathPackageJson, pathStaticSvg }
