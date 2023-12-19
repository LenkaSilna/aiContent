module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'react/require-default-props': 0,
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [0],
		'no-console': 0,
		'no-debugger': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'react/jsx-filename-extension': [1, {'extensions': ['.jsx', '.tsx']}],
		'react/function-component-definition': 'off',
		'react/react-in-jsx-scope': 0,
	},
}
