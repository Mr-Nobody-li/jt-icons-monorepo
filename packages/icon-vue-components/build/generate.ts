/*
 * @Author: Mr-Nobody-li
 * @Date: 2022-08
 * @LastEditors: Mr-Nobody-li
 * @LastEditTime: 2022-08
 * @Description: 生成icon-vue-components
 */
import path from 'path'
import { writeFile } from 'fs/promises'
import { emptyDir } from 'fs-extra'
import consola from 'consola'
import camelcase from 'camelcase'
import { format } from 'prettier'
import chalk from 'chalk'
import { pathComponents } from './paths'
import type { BuiltInParserName } from 'prettier'
import icons from '../svg'

const prefix = 'Jticon'

const formatCode = (
  code: string,
  parser: BuiltInParserName = 'typescript'
) =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true
  })

const transformToVueComponent = async (
  iconName: string,
  iconContent: string
) => {
  const vue = formatCode(
    `
      <template>
        ${iconContent}
      </template>
      <script lang="ts">
        import type { DefineComponent } from 'vue'
        export default ({
          name: "${prefix}-${iconName}",
        }) as DefineComponent
      </script>
    `,
    'vue'
  )
  writeFile(
    path.resolve(pathComponents, `${prefix}-${iconName}.vue`),
    vue,
    'utf-8'
  )
}

const generateEntry = async (icons: {
  [iconName: string]: string
}) => {
  const temp = []
  for (const iconName in icons) {
    const camelcaseIconName = camelcase(iconName, {
      pascalCase: true
    })
    temp.push(
      `export { default as ${
        prefix + camelcaseIconName
      } } from './${prefix}-${iconName}.vue'`
    )
  }
  const code = formatCode(temp.join('\n'))

  await writeFile(
    path.resolve(pathComponents, 'index.ts'),
    code,
    'utf-8'
  )
}

consola.info(chalk.blue('清空src/components'))
await emptyDir(pathComponents)

consola.info(chalk.blue('生成icon-vue-components'))
for (const iconName in icons) {
  transformToVueComponent(iconName, icons[iconName])
}

consola.info(chalk.blue('生成入口文件'))
await generateEntry(icons)
