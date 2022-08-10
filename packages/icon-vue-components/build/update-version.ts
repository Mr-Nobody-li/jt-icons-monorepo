/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 更新package.json version patch版本号
 */
import semver from 'semver'
import { readFile, writeFile } from 'fs/promises'
import { format } from 'prettier'
import { pathPackageJson } from './paths'

// 更新package.json version patch版本号
const content = await readFile(pathPackageJson, 'utf-8')
const contentObj = JSON.parse(content)
contentObj.version = semver.inc(contentObj.version, 'patch')
const newContent = format(JSON.stringify(contentObj), {
  parser: 'json-stringify'
})

writeFile(pathPackageJson, newContent, 'utf-8')

console.log('更新package.json版本号：' + contentObj.version)
