/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description:获取关键文件夹的绝对路径
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))
const pathRoot = resolve(dir, '..')
const pathSrc = resolve(pathRoot, 'src')
const pathComponents = resolve(pathSrc, 'components')
const pathOutput = resolve(pathRoot, 'dist')
const pathSvgFiles = resolve(pathRoot, '..', 'icon-server/static/svg')
const pathPackageJson = resolve(pathRoot, 'package.json')

export {
  pathRoot,
  pathSrc,
  pathComponents,
  pathOutput,
  pathSvgFiles,
  pathPackageJson
}
