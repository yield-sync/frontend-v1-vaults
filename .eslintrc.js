module.exports = {
	root: true,
	env: {
		node: true
	},
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"array-bracket-newline": [
			"error",
			"always",
		],
		"array-element-newline": [
			"error",
			"always",
		],
		"array-bracket-spacing": [
			"error",
			"never",
		],
		"arrow-parens": [
			"error",
			"always",
		],
		"brace-style": [
			"error",
			"allman",
		],
		"camelcase": [
			"error",
			{
				"properties": "always" 
			},
		],
		"comma-dangle": [
			"error",
			{
				"arrays": "always",
				"objects": "never",
				"imports": "never",
				"exports": "never",
				"functions": "never"
			},
		],
		"comma-spacing": [
			"error",
			{
				"before": false,
				"after": true 
			},
		],
		"dot-location": [
			"error",
			"property",
		],
		"indent": [
			"error",
			"tab",
		],
		"implicit-arrow-linebreak": [
			"error",
			"beside",
		],
		"jsx-quotes": [
			"error",
			"prefer-double",
		],
		"key-spacing": [
			"error",
			{
				"afterColon": true,
				"beforeColon": false 
			},
		],
		"keyword-spacing": [
			"error",
			{
				"before": true 
			},
		],
		"lines-between-class-members": [
			"error",
			"always",
		],
		"line-comment-position": [
			"error",
			{
				"position": "above" 
			},
		],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-duplicate-imports": "error",
		"no-mixed-spaces-and-tabs": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-trailing-spaces": process.env.NODE_ENV === "production" ? "error" : "off",
		"object-curly-newline": [
			"error",
			{
				"ObjectExpression": "always",
				"ImportDeclaration": "never",
				"ExportDeclaration": {
					"multiline": true, "minProperties": 3 
				}
			},
		],
		"quotes": [
			"error",
			"double",
		]
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
			],
			env: {
				jest: true
			}
		},
	]
}
