/**
 * @see https://uni-helper.js.org/eslint-config
 */

import uniHelper from '@uni-helper/eslint-config';

export default uniHelper(
  {
    // 全局配置
    rules: {
      'no-console': 'off',
      'no-empty': 'off',
      'style/comma-dangle': 'off',
      'style/arrow-parens': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'perfectionist/style/arrow-parens': 'off',
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'style/brace-style': 'off'
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
      maxLen: 120
    },
    bestPractices: {
      noVar: true,
      noUnusedVars: true
    },
    possibleErrors: {
      noUndefined: true,
      noConstantCondition: true
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    ignores: ['src/env.d.ts']
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'style/brace-style': 'off',
      'style/quote-props': 'off'
    }
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'no-restricted-syntax': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-reactivity-loss': 'off',
      'vue/block-order': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
);
