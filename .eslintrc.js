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
			"warn",
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
		],
		"vue/component-definition-name-casing": [
			"error",
			"PascalCase",
		],
		"vue/html-indent": [
			"error",
			"tab",
			{
				"attribute": 1,
				"baseIndent": 1,
				"closeBracket": 0,
				"alignAttributesVertically": true,
				"ignores": [
				]
		  },
		],
		"vue/html-self-closing": [
			"error",
			{
				html: {
					normal: "never", void: "always"
				},
				"svg": "always",
				"math": "always"
		  },
		],
		"vue/html-quotes": [
			"error",
			"double",
			{
				"avoidEscape": false 
			}, 
		],
		"vue/max-attributes-per-line": [
			"error",
			{
				"singleline": {
					"max": 3
				},      
				"multiline": {
					"max": 3
				}
		  },
		],
		"vue/multiline-html-element-content-newline": [
			"error",
			{
				"ignoreWhenEmpty": true,
				"ignores": [
				],
				"allowEmptyLines": true
			},
		],
		"vue/script-indent": [
			"error",
			"tab",
			{
				"baseIndent": 1,
				"switchCase": 1,
				"ignores": [
				]
		  },
		]
	},
	overrides: [
		{
			"files": [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)",
				"*.vue",
			],
			"env": {
				jest: true
			},
			"rules": {
			  "indent": "off"
			}
		  },
	]
}
