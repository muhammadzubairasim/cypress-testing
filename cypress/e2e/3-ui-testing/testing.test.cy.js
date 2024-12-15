describe('ChatGPT UI Test', () => {
    it('should load the ChatGPT page and check for the presence of the input field', () => {
        cy.visit('https://www.google.com/'); // Replace with the actual URL if different
        cy.get('[aria-label="Sign in"]').click()
    });

    // it('should send a message and check for a response', () => {
    //     cy.visit('https://chatgpt.com/'); // Replace with the actual URL if different
    //     cy.get('input[type="text"]').type('Hello, ChatGPT!');
    //     cy.get('button[type="submit"]').click();
    //     cy.contains('Hello, ChatGPT!').should('be.visible');
    //     cy.contains('Hello! How can I assist you today?').should('be.visible'); // Adjust the expected response as needed
    // });
});