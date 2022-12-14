/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 提交到远程仓库
 */
import { simpleGit } from 'simple-git'
import { pathGit } from './paths.js'
import { updateVersion,resetVersion } from './update-version.js'

const gitPush = async () => {
  const git = simpleGit(pathGit)
  const gitStatus = await git.status()
  if (gitStatus.files.length) {
    const version = await updateVersion()
    console.log(`git push 版本号${version}`)
    try {
      await git
        .add('./*')
        .commit(`feat: 更新图标,版本号v${version}`)
        .push('origin', 'master')
        .addTag(`v${version}`)
        .pushTags('origin')
      return {
        code: 0,
        message: `workflow执行中,版本号v${version}`
      }
    } catch (error) {
      resetVersion()
      return {
        code: 10001,
        message: `workflow执行失败: ${error}`
      }
    }
  } else {
    return {
      code: 10001,
      message: `没有新的图标`
    }
  }
}

export { gitPush }
