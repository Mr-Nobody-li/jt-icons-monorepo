/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 更新icon-vue-components的package.json版本号
 */
import semver from 'semver'
import { readFile, writeFile } from 'node:fs/promises'
import { format } from 'prettier'
import { pathPackageJson } from './paths.js'

let oldVersion = null

// 更新patch版本号
const updateVersion = async () => {
  const content = await readFile(pathPackageJson, 'utf-8')
  const contentObj = JSON.parse(content)
  oldVersion =  contentObj.version
  contentObj.version = semver.inc(contentObj.version, 'patch')
  const newContent = format(JSON.stringify(contentObj), {
    parser: 'json-stringify'
  })
  await writeFile(pathPackageJson, newContent, 'utf-8')

  return contentObj.version
}

// 恢复版本号
const resetVersion = async () => {
  const content = await readFile(pathPackageJson, 'utf-8')
  const contentObj = JSON.parse(content)
  contentObj.version = oldVersion
  const newContent = format(JSON.stringify(contentObj), {
    parser: 'json-stringify'
  })
  await writeFile(pathPackageJson, newContent, 'utf-8')
}

export { updateVersion,resetVersion }
