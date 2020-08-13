module.exports = {
  "presets": [
      // "@vue/app",
      ["@babel/preset-env", {
          "targets": {
              "node": "8",
              "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          },
          useBuiltIns: "usage"
      }]
  ],
  "plugins": [
      ["@babel/plugin-transform-runtime", {
          "corejs": 2,
      }],
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-async-to-generator",
      "@babel/plugin-transform-object-assign",
      ["@babel/plugin-proposal-decorators", {
          "legacy": true
      }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-syntax-jsx",
      "@babel/plugin-syntax-dynamic-import"
  ]
}