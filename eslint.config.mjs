import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'.vercel/**',
			'out/**',
			'build/**',
			'.env*',
			'*.tsbuildinfo',
			'next-env.d.ts',
			'.idea/**',
		],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'prefer-const': 'warn',
			'no-var': 'error',
			'no-eval': 'error',
			'no-param-reassign': ['warn', { props: false }],
			'react/jsx-key': [
				'error',
				{
					checkFragmentShorthand: true,
					checkKeyMustBeforeSpread: true,
				},
			],
			'react/jsx-no-bind': [
				'warn',
				{
					allowArrowFunctions: true,
					allowBind: false,
				},
			],
			'react/no-danger': 'warn',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-expect-error': 'allow-with-description',
					'ts-ignore': true,
					'ts-nocheck': true,
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': [
				'off',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
				},
			],
			'@typescript-eslint/no-empty-interface': 'warn',
			'sort-imports': [
				'warn',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
				},
			],
			'no-duplicate-imports': 'error',
			complexity: ['warn', 20],
			'max-len': [
				'warn',
				{
					code: 120,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
				},
			],
			'array-callback-return': 'error',
			'no-nested-ternary': 'warn',
		},
	},
];

export default eslintConfig;
