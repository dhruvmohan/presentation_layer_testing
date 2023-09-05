const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
 require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
 const createEsBuildPlugin =
 require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const xlsx = require("node-xlsx").default;
const fs = require("fs"); // for file
const path = require("path"); // for file path

const readXlsx = require("./read-xlsx");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: true,
    watchForFileChanges: false,
    screenshotOnRunFailure: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    screenshotsFolder: "cypress/results/mochawesome-report/assets",
    retries: {
      runMode: 1,
      openMode: 1,
    },
    defaultCommandTimeout: 50000,
    reporter: "mochawesome",
    reporterOptions: {
      charts: true,
      reportDir: "cypress/results",
      reportFilename: "report",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    video: true,
    baseUrl: "https://rbl-tu1.rbl-test.comp.db.de/",
    //   specPattern: "cypress/e2e/*.feature",

    specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],

    async setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
      });

      on("task", {
        readXlsx: readXlsx.read,
      });

    //  const bundler = createBundler({
    //    plugins: [createEsBuildPlugin(config)],
    //  });
    //  on("file:preprocessor", bundler);
    //  await addCucumberPreprocessorPlugin(on, config);
    //  return config;
    },
   
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
