const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // e2e options here
    //baseUrl: 'https://ouj-uat-parkholidays.vercel.app/',
    baseUrl: 'https://www.parkholidays.com/',
    
    supportFile : false,
    specPattern: "Cypress/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  }
})