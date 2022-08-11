/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 提交到远程仓库
 */
import { simpleGit } from 'simple-git'
import { pathGit } from './paths.js'

const gitPush = (version) => {
  console.log(`git push 版本号${version}`)
  simpleGit(pathGit)
    .add('./*')
    .commit('test: 测试git')
    .push('origin', 'master')
    .addTag(`v${version}`)
    .push('origin', 'master')
}

export { gitPush }
