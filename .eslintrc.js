module.exports = {
	root: true,
	env: {
		node: true
	},
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended"
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"indent": ["error", "tab"],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-mixed-spaces-and-tabs": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-trailing-spaces": process.env.NODE_ENV === "production" ? "error" : "off",
		"quotes": ["error", "double"]
	},
	overrides: [
		{
			files: [
				"**/__tests__/*.{j,t}s?(x)",
				"**/tests/unit/**/*.spec.{j,t}s?(x)"
			],
			env: {
				jest: true
			}
		}
	]
}
