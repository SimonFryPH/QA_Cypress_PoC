const { defineConfig } = require('cypress')

module.exports = defineConfig({

  failOnStatusCode: false,
  chromeWebSecurity: false,
  //viewportWidth : 1920,
  //viewportHeight : 1080,
  defaultCommandTimeout: 20000,
  //screenSizes: [[1920, 1028],[320, 568], [768, 1024]],
  screenSizes: [ [1920, 1028]],

  e2e: {
    supportFile: false,
    specPattern: "./cypress/e2e/**/**/*.cy.{js,jsx,ts,tsx}",
    submitBooking: false, // set to true to actually book visits, submit to get to payment page etc

    ph: {
      baseUrl: 'https://www.parkholidays.com/',
      //baseUrl: 'https://huj-qa-release.vercel.app/',
      //baseUrl: 'https://staging-www.parkholidays.io/',
      //baseUrl: 'https://release-ouj-master.vercel.app/',
      siteMapUrl: 'https://www.parkholidays.com/sitemap.xml/',
      //siteMapUrl: 'https://release-ouj-master.vercel.app/sitemap.xml/',
      myholidayUrl: 'https://myholiday.parkholidays.com/login',
      ownersUrl: 'https://owners.parkholidays.com/login',

      holidayParks: ["Alberta", "Ashbourne Heights", "Birchington Vale", "Bodmin", "Bowland Fell", "Broadland Sands", "Carlton Meres", "Chichester Lakeside", "Coghurst Hall", "Dawlish Sands", "Dovercourt", "Felixstowe Beach", "Golden Sands", "Harts", "Hedley Wood", "Hengar Manor", "Landscove", "Lossiemouth", "Marlie", "Martello Beach", "New Beach", "Pakefield", "Pevensey Bay", "Polperro", "Riviera Bay", "Rye Harbour", "Sand le Mere", "Sandhills", "Seaview", "Seawick", "Silver Sands", "Solent Breezes", "St Osyth Beach", "Steeple Bay", "Suffolk Sands", "Tarka", "Trevella", "Turnberry", "Waterside", "Winchelsea Sands", "Wood Farm"],
      touringParks: ["Ashbourne Heights", "Birchington Vale", "Burghead", "Carlton Meres", "Dovercourt", "Golden Sands", "Hedley Wood", "Marlie", "Sand le Mere", "Seaview", "Silver Sands", "Steeple Bay", "Trevella", "West Mersea", "Wood Farm"],
      ownershipParks: ["Alberta", "Ashbourne Heights", "Beauport", "Birchington Vale", "Bowland Fell", "Broadland Sands", "Burghead", "Carlton Meres", "Chichester Lakeside", "Coghurst Hall", "Dawlish Sands", "Dovercourt", "Felixstowe Beach", "Golden Sands", "Harts", "Hedley Wood", "Hengar Manor", "Landscove", "Lossiemouth", "Marlie", "Martello Beach", "New Beach", "Oaklands", "Pakefield", "Pevensey Bay", "Polperro", "Riviera Bay", "Rye Harbour", "Sand le Mere", "Sandhills", "Seaview", "Seawick", "Silver Sands", "Solent Breezes", "St Osyth Beach", "Steeple Bay", "Suffolk Sands", "Tarka", "Trevella", "Turnberry", "Waterside", "West Mersea", "Winchelsea Sands", "Wood Farm"]
    },

    pl: {
      baseUrl: 'https://www.parkleisureholidays.co.uk/',
      baseSearchUrl: 'https://search.parkleisureholidays.co.uk/holidays/search/',
      siteMapUrl: 'https://www.parkleisureholidays.co.uk/sitemap.xml',
      holidayParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"],
      touringParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"],
      ownershipParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"]
    },

   
    testUser: {
      title: "Mr",
      firstname: "firstnamePHUKTest",
      surname: "surnamePHUKTest",
      phoneno: "01234567890",
      email: "phuktest@email.com",
      postcode: "TN39 5ES",
      fulladdress: "Park Holidays UK Ltd, Glovers House Glovers End Bexhill-on-Sea"
    }

  }



})