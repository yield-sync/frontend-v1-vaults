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
		"arrow-body-style": [
			"error",
			"always",
		]
		, "arrow-parens": [
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
				"objects": "ignore",
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
		"vue/array-bracket-newline": [
			"error",
			"always",
		],
		"vue/array-bracket-spacing": [
			"error",
			"never",
		],
		"vue/comma-dangle": [
			"error",
			{
				"arrays": "always",
				"objects": "never",
				"imports": "never",
				"exports": "never",
				"functions": "never"
			},
		],
		"vue/comma-spacing": [
			"error",
			{
				"before": false,
				"after": true 
			},
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
		"vue/key-spacing": [
			"error",
			{
				"afterColon": true,
				"beforeColon": false 
			},
		],
		"vue/keyword-spacing": [
			"error",
			{
				"before": true 
			},
		],
		"vue/max-len": [
			"error",
			{
				"code": 120,
				"comments": 120,
				"template": 120,
				"tabWidth": 4,
				"ignoreComments": false,
				"ignoreHTMLAttributeValues": false,
				"ignoreHTMLTextContents": false,
				"ignorePattern": "",
				"ignoreRegExpLiterals": false,
				"ignoreStrings": false,
				"ignoreTrailingComments": false,
				"ignoreTemplateLiterals": false,
				"ignoreUrls": false
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
		"vue/mustache-interpolation-spacing": [
			"error",
			"always",
		],
		"vue/no-useless-v-bind": [
			"error",
			{
				"ignoreIncludesComment": false,
				"ignoreStringEscape": false
			},
		],
		"vue/padding-line-between-blocks": [
			"error",
			"always",
		],
		/**
		 * @dev Cannot uncomment until eslint-plugin-vue v9.9+
		* "vue/padding-line-between-tags": [
		* 	"error",
		* 	
		* 	{
		* 		"blankLine": "always",
		* 		"prev": "*",
		* 		"next": "*" 
		* 	},
		* ],
		* "vue/padding-lines-in-component-definition": [
		* 	"error",
		* 	{
		* 		"betweenOptions": "always"			
		* 	},
		* ],
		*/
		"vue/require-direct-export": [
			"error",
			{
				"disallowFunctionalComponentFunction": false
		  },
		],
		"vue/require-name-property": 1,
		"vue/script-indent": [
			"error",
			"tab",
			{
				"baseIndent": 1,
				"switchCase": 1,
				"ignores": [
				]
		  },
		],
		"vue/v-for-delimiter-style": [
			"error",
			"in",
		],
		semi: [
			"error",
			"always",
		],
		"@typescript-eslint/no-empty-function": [
			"warn",
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
};
