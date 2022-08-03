  describe('PHUK Sitemap URL requests', () => {
    let urls = [];
  
    before(() => {
      const parser = new DOMParser();
  
      cy.request(Cypress.config().siteMapUrl).then((response) => {
        const document = parser.parseFromString(response.body, 'application/xml');
        const parsedUrls = document.getElementsByTagName('loc'); // count
        urls = Array.from(parsedUrls).map((item) => item.innerHTML); // All urls in
      });
    });
  
    it('Should get each url from the sitemap and return a 200', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        //urls.forEach(cy.visit);
        for (var i = 0; i < urls.length; i++) {
            //cy.request('GET',urls[i])
            // confirm the status code is 201
            //expect(resp.status).to.eq(200)

            cy.request('GET',urls[i])
            .should((response) => {
             expect(response.status).to.eq(200)
             expect(response).to.have.property('headers')
             expect(response).to.have.property('duration')
            })

            
        }
        cy.log("*** Finished ***")
    });
  });