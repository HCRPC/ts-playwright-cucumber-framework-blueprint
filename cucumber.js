module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts",
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
        "progress",
        "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html"],
    //publishQuiet: true,
    parallel: 2
  },
  smoke: {
    paths: ["features/**/*.feature"],
    require: [
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts",
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
        "progress",
        "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html"],
    tags: "@smoke",
    parallel: 2
  },
  acceptance: {
    paths: ["features/**/*.feature"],
    require: [
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts",
      "src/support/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
        "progress",
        "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html"],
    tags: "@acceptance",
    parallel: 2
  }
};
