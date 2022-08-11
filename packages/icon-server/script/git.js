/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 提交到远程仓库
 */
import { simpleGit } from 'simple-git'
import { pathGit } from './paths.js'

const gitPush = async (version) => {
  console.log(`git push 版本号${version}`)
  const git = await simpleGit(pathGit)
  const gitStatus = git.status()
  if (gitStatus.files.length) {
    git
      .add('./*')
      .commit(`feat: 更新图标,版本号v${version}`)
      .push('origin', 'master')
      .addTag(`v${version}`)
      .pushTags('origin')
    return 'workflow执行中'
  } else {
    return '没有新的图标'
  }
}

export { gitPush }
