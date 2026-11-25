const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    viewportWidth: 2056,
    viewportHeight: 1329,
    // Use Chrome instead of deprecated Electron
    browser: 'chrome',
  },
  env: {
    // Credentials can be overridden via cypress.env.json or CLI
    username: 'standard_user',
    password: 'secret_sauce',
  },
});