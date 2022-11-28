const { defineConfig } = require('cypress')

module.exports = defineConfig({

  failOnStatusCode: false,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  //viewportWidth : 1920,
  //viewportHeight : 1080,
  defaultCommandTimeout: 20000,
  //screenSizes: [ [375, 667]],
  //screenSizes: [ [375, 667],[768, 1024]],
  //screenSizes: [ [1920, 1080]],
  //screenSizes: [[1920, 1080],[768, 1024]],
  //screenSizes: [[1920, 1080],[768, 1024],[375, 667]],
  screenSizes: [[375, 667],[768, 1024],[1920, 1080]],
  //screenSizes: [[375, 667],[1920, 1080]],

  e2e: {
    supportFile: false,
    specPattern: "./cypress/e2e/**/**/*.cy.{js,jsx,ts,tsx}",
    submit: false, // set to true to actually book visits, submit to get to payment page, registration etc
    testemailsuffix: "@phcypresstestemail.com",
    
    ph: {
      siteMapUrl: 'https://www.parkholidays.com/sitemap.xml/',
      //siteMapUrl: 'https://release-ouj-master.vercel.app/sitemap.xml/',

      baseUrl: 'https://www.parkholidays.com/',
      //baseUrl: 'https://huj-qa-release.vercel.app/',
      //baseUrl: 'https://staging-www.parkholidays.io/',
      //baseUrl: 'https://release-ouj-master.vercel.app/',

      my: {
        url: 'https://my.parkholidays.com/',
        emailUser: 'marketing@parkholidays.com',
        password: 'Marketing101',
        customerNumber: 'CUS999996',
        park: 'Marlie',
        pitch: 'DEPITCH20'
      },
      
      owners: {
        url: 'https://owners.parkholidays.com/',
        emailUser: 'marketing@parkholidays.com',
        password: 'Marketing101'
      },

      myHoliday: {
        url: 'https://myholiday.parkholidays.com/',
        bookingRef: 'BKG3412329',
        surname: 'Fry'
      },

      holidayParks: ["Alberta", "Ashbourne Heights", "Birchington Vale", "Bodmin", "Bowland Fell", "Broadland Sands", "Carlton Meres", "Chichester Lakeside", "Coghurst Hall", "Dawlish Sands", "Dovercourt", "Felixstowe Beach", "Golden Sands", "Harts", "Hedley Wood", "Hengar Manor", "Landscove", "Lossiemouth", "Marlie", "Martello Beach", "New Beach", "Pakefield", "Pevensey Bay", "Polperro", "Riviera Bay", "Rye Harbour", "Sand le Mere", "Sandhills", "Seaview", "Seawick", "Silver Sands", "Solent Breezes", "St Osyth Beach", "Steeple Bay", "Suffolk Sands", "Tarka", "Trevella", "Turnberry", "Waterside", "Winchelsea Sands", "Wood Farm"],
      touringParks: ["Ashbourne Heights", "Birchington Vale", "Burghead", "Carlton Meres", "Dovercourt", "Golden Sands", "Hedley Wood", "Marlie", "Sand le Mere", "Seaview", "Silver Sands", "Steeple Bay", "Trevella", "West Mersea", "Wood Farm"],
      ownershipParks: ["Alberta", "Ashbourne Heights", "Beauport", "Birchington Vale", "Bowland Fell", "Broadland Sands", "Burghead", "Carlton Meres", "Chichester Lakeside", "Coghurst Hall", "Dawlish Sands", "Dovercourt", "Felixstowe Beach", "Golden Sands", "Glendale","Harts", "Hedley Wood", "Hengar Manor", "Landscove", "Lossiemouth", "Marlie", "Martello Beach", "New Beach", "Oaklands", "Pakefield", "Pevensey Bay", "Polperro", "Riviera Bay", "Rye Harbour", "Sand le Mere", "Sandhills", "Seaview", "Seawick", "Silver Sands", "Solent Breezes", "St Osyth Beach", "Steeple Bay", "Suffolk Sands", "Tarka", "Trevella", "Turnberry", "Waterside", "West Mersea", "Winchelsea Sands", "Wood Farm"]
    },

    pl: {
      siteMapUrl: 'https://www.parkleisureholidays.co.uk/sitemap.xml',
      baseUrl: 'https://www.parkleisureholidays.co.uk/',
      baseSearchUrl: 'https://search.parkleisureholidays.co.uk/holidays/search/',
      
      holidayParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"],
      touringParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"],
      ownershipParks: ["Brynteg", "Littondale", "Malvern View", "Par Sands", "Pentire"]
    },

    scuk: {
      baseUrl: 'https://sun-corporate.vercel.app/'
    },


    testUser: {
      title: "Mr",
      firstname: "firstnamePHUKTest",
      surname: "surnamePHUKTest",
      phoneno: "01234567890",
      email: "parkholidaystesting@gmail.com",
      postcode: "TN39 5ES",
      fulladdress: "Park Holidays UK Ltd, Glovers House Glovers End Bexhill-on-Sea"
    }

  }



})