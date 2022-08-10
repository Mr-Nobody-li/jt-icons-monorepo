/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 提交到远程仓库
 */
import { simpleGit } from 'simple-git'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))
const pathGit = resolve(dir, '..')
const git = simpleGit(pathGit)

git
  .add('./*')
  .commit('test: 测试git')
  .addRemote(
    'origin',
    'git@github.com:Mr-Nobody-li/jt-icons-monorepo.git'
  )
  .push('origin', 'master')
