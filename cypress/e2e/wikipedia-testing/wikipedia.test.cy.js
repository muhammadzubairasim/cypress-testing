describe('Wikipedia Website Test', () => {
    beforeEach(() => {
        // This will run before each test and open the Wikipedia homepage
        cy.visit('https://www.wikipedia.org');
    });

    it('should load the Wikipedia homepage', () => {
        // Verify the page title
        cy.title().should('eq', 'Wikipedia');

        // Check if the Wikipedia logo is visible
        cy.get('.central-textlogo__image').should('be.visible');

        // Ensure the search input field is visible
        cy.get('input#searchInput').should('be.visible');
    });
    it('should verify the presence of the Wikipedia logo', () => {
        cy.get('.central-featured-logo').should('be.visible');
    });
    it('should search for "Cypress (software)"', () => {
        // Type "Cypress (software)" in the search input field
        cy.get('input#searchInput').type('Cypress (software)');

        // Click the search button
        cy.get('button[type="submit"]').click();

        // Verify that the search results page loads
        cy.url().should('include', '/wiki/Cypress_(software)');

        // Check the article title is correct
        cy.get('#firstHeading').should('have.text', 'Cypress (software)');

        // Verify that the main content contains the word "testing"
        cy.get('#mw-content-text').should('contain.text', 'testing');
    });

    it('should navigate to the English site from the homepage', () => {
        // Click the "English" language link
        cy.get('#js-link-box-en').click();

        // Verify the English Wikipedia homepage loaded
        cy.url().should('eq', 'https://en.wikipedia.org/wiki/Main_Page');

        // Ensure the search bar is visible
        cy.get('input#searchInput').should('not.be.visible');
    });
    const timeLimit = 50000;
    it(`should fail if search query takes more than ${timeLimit} analyze the result `, () => {
        const queries = [
            "Cypress (software)",
            "JavaScript",
            "Automation",
            "Testing",
            "React (JavaScript library)",
            "Node.js",
            "TypeScript",
            "Web Development",
            "Open Source",
            "Continuous Integration",
            "End-to-End Testing",
            "Component Testing",
            "Performance Testing",
            "Software Development Lifecycle",
            "Agile Methodology",
            "DevOps Practices",
            "API Testing",
            "Frontend Development",
            "Backend Development",
            "Cross-Browser Testing"
        ];



        queries.forEach((query) => {
            cy.visit('https://www.wikipedia.org');
            cy.get('input#searchInput').type(query);

            // Start timer
            const startTime = Date.now();

            // Trigger the search and check URL
            cy.get('button[type="submit"]').click();
            cy.url({ timeout: timeLimit }).should('include', '/wiki/').then(() => {
                const endTime = Date.now();
                const timeTaken = endTime - startTime;

                if (timeTaken > timeLimit) {
                    throw new Error(`Search for "${query}" took too long: ${timeTaken} ms`);
                } else {
                    cy.log(`Search for "${query}" completed in ${timeTaken} ms.`);
                }


                cy.get('#firstHeading').should("contain.text", query).then(() => {
                    cy.get('#firstHeading').invoke('text').then((heading) => {
                        cy.log(`Heading: ${heading}`);
                    });
                    cy.get('body')
                        .invoke('text')
                        .then((pageText) => {
                            expect(pageText).to.include(query);
                            cy.log(`Page text contains: ${query}`);
                        });
                });
            });
        });

    });

});