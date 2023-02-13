/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2023-02
 * @Description: 生成icon-vue-components
 */
import path from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'
import { emptyDir } from 'fs-extra'
import camelcase from 'camelcase'
import { format } from 'prettier'
import type { BuiltInParserName } from 'prettier'
import glob from 'fast-glob'
import { optimize } from 'svgo'
import { pathComponents, pathSvgFiles } from './paths'

const prefix = 'Jticon'

const getSvgFiles = () =>
  glob('*.svg', { cwd: pathSvgFiles, absolute: true })

const formatCode = (
  code: string,
  parser: BuiltInParserName = 'typescript'
) =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })

const getName = (filePath: string) =>
  path.basename(filePath).replace('.svg', '')

const transformToVueComponent = async (filePath: string) => {
  const content = handleSvgFormat(await readFile(filePath, 'utf-8'))
  const filename = getName(filePath)
  const vue = formatCode(
    `
      <template>
        ${content}
      </template>
      <script lang="ts">
        import type { DefineComponent } from 'vue'
        export default ({
          name: "${prefix}-${filename}",
        }) as DefineComponent
      </script>
    `,
    'vue'
  )
  writeFile(
    path.resolve(pathComponents, `${prefix}-${filename}.vue`),
    vue,
    'utf-8'
  )
}

const handleSvgFormat = (svgContent) => {
  const { data } = optimize(svgContent, {
    multipass: true,
    removeDimensions: true,
    removeStyleElement: true,
    removeScriptElement: true,
  })
  return data
}

const generateEntry = async (filePathList: string[]) => {
  const code = formatCode(
    filePathList
      .map((file) => {
        const filename = getName(file)
        const camelcaseIconName = camelcase(filename, {
          pascalCase: true,
        })
        return `
          export { default as 
          ${prefix + camelcaseIconName} 
          } from './${prefix}-${filename}.vue'
        `
      })
      .join('\n')
  )
  await writeFile(
    path.resolve(pathComponents, 'index.ts'),
    code,
    'utf-8'
  )
}

console.log('1、清空src/components')
await emptyDir(pathComponents)

console.log('2、生成icon-vue-components')
const filePathList = await getSvgFiles()
await Promise.all([
  filePathList.map((filePath) => transformToVueComponent(filePath)),
])

console.log('3、生成入口文件')
await generateEntry(filePathList)
