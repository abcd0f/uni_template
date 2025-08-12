/**
 * @see https://uni-helper.js.org/eslint-config
 */

import uniHelper from '@uni-helper/eslint-config';

export default uniHelper({
  rules: {
    'no-console': 'off',
    'no-empty': 'off',
    'style/comma-dangle': 'off',
    'style/arrow-parens': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'perfectionist/style/arrow-parens': 'off'
  },
  // 代码风格相关规则配置
  stylistic: {
    indent: 2, // 缩进为2个空格
    quotes: 'single', // 字符串必须使用单引号
    semi: true, // 语句末尾必须加分号
    maxLen: 120 // 每行最大长度为120个字符，超过报错
  },

  // 最佳实践相关规则，帮助避免常见错误和坏习惯
  bestPractices: {
    noVar: true, // 禁止使用 var，必须使用 let 或 const
    noUnusedVars: true // 禁止定义后未使用的变量
  },

  // 可能导致错误的代码检查
  possibleErrors: {
    noUndefined: true, // 禁止使用未定义的变量
    noConstantCondition: true // 禁止在条件判断中使用恒定不变的条件（如 if(true)）
  },

  // 环境相关配置，指定代码运行的环境，影响可用的全局变量等
  env: {
    browser: true, // 代码运行在浏览器环境
    node: true, // 代码运行在 Node.js 环境
    es6: true // 启用 ES6 语法特性支持
  },
  ignores: ['src/env.d.ts'] // 忽略的文件或目录
});
