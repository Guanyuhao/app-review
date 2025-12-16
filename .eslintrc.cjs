module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  ignorePatterns: ["out/", ".next/", "node_modules/"],
  overrides: [
    {
      files: ["src/worker.js"],
      rules: {
        // Worker 入口不需要拆成变量导出
        "import/no-anonymous-default-export": "off"
      }
    }
  ]
};


