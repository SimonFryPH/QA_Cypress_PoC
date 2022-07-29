const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // e2e options here
    //baseUrl: 'https://ouj-uat-parkholidays.vercel.app/',
    baseUrl: 'https://www.parkholidays.com/',
    siteMapUrl: 'https://www.parkholidays.com/sitemap.xml',
    phHolidayParks: ["Alberta","Ashbourne Heights","Birchington Vale","Bodmin","Bowland Fell","Broadland Sands","Carlton Meres","Chichester Lakeside","Coghurst Hall","Dawlish Sands","Dovercourt","Felixstowe Beach","Golden Sands","Harts","Hedley Wood","Hengar Manor","Landscove","Lossiemouth","Marlie","Martello Beach","New Beach","Pakefield","Pevensey Bay","Polperro","Riviera Bay","Rye Harbour","Sand le Mere","Sandhills","Seaview","Seawick","Silver Sands","Solent Breezes","St Osyth Beach","Steeple Bay","Suffolk Sands","Tarka","Trevella","Turnberry","Waterside","Winchelsea Sands","Wood Farm"],
    phOwnershipParks: ["Alberta","Ashbourne Heights","Beauport","Birchington Vale","Bowland Fell","Broadland Sands","Burghead","Carlton Meres","Chichester Lakeside","Coghurst Hall","Dawlish Sands","Dovercourt","Felixstowe Beach","Golden Sands","Harts","Hedley Wood","Hengar Manor","Landscove","Lossiemouth","Marlie","Martello Beach","New Beach","Oaklands","Pakefield","Pevensey Bay","Polperro","Riviera Bay","Rye Harbour","Sand le Mere","Sandhills","Seaview","Seawick","Silver Sands","Solent Breezes","St Osyth Beach","Steeple Bay","Suffolk Sands","Tarka","Trevella","Turnberry","Waterside","West Mersea","Winchelsea Sands","Wood Farm"],

    supportFile : false,
    specPattern: "../cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  }
})