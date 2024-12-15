describe('Form Validation Tests', () => {
    beforeEach(() => {
        cy.visit('../../Form-UI/form.html');
    });

    it('should display error when name is empty', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#nameError').should('contain', 'Name is required');
    });

    it('should display error when email is empty', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#emailError').should('contain', 'Valid email is required');
    });

    it('should display error when email is invalid', () => {
        cy.get('#email').type('invalid-email');
        cy.get('button[type="submit"]').click();
        cy.get('#emailError').should('contain', 'Valid email is required');
    });
    it('should display error when mobile is empty', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#mobileError').should('contain', 'Valid mobile number is required')
    });

    it('should display error when mobile is invalid', () => {
        cy.get('#mobile').type('invalid-mobile');
        cy.get('button[type="submit"]').click();
        cy.get('#mobileError').should('contain', 'Valid mobile number is required');
    });

    it('should display error when country is not selected', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#countryError').should('contain', 'Country selection is required');
    });

    it('should submit the form successfully when all fields are valid', () => {
        cy.get('#name').type('John Doe');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#mobile').type('1234567890');
        cy.get('#country').select('United States');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Form submitted successfully');
        });
    });

    it('should clear previous errors when form is resubmitted', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#nameError').should('contain', 'Name is required');
        cy.get('#name').type('John Doe');
        cy.get('button[type="submit"]').click();
        cy.get('#nameError').should('not.contain', 'Name is required');
    }); 

    it('should display multiple errors when multiple fields are invalid', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#nameError').should('contain', 'Name is required');
        cy.get('#emailError').should('contain', 'Valid email is required');
        cy.get('#mobileError').should('contain', 'Valid mobile number is required');
        cy.get('#countryError').should('contain', 'Country selection is required');
    });

    it('should not display error for valid name', () => {
        cy.get('#name').type('John Doe');
        cy.get('button[type="submit"]').click();
        cy.get('#nameError').should('not.exist');
    });

    it('should not display error for valid email', () => {
        cy.get('#email').type('john.doe@example.com');
        cy.get('button[type="submit"]').click();
        cy.get('#emailError').should('not.exist');
    });

    it('should not display error for valid mobile', () => {
        cy.get('#mobile').type('1234567890');
        cy.get('button[type="submit"]').click();
        cy.get('#mobileError').should('not.exist');
    });

    it('should not display error for valid country selection', () => {
        cy.get('#country').select('United States');
        cy.get('button[type="submit"]').click();
        cy.get('#countryError').should('not.exist');
    });
    it('should display success message when form is submitted with valid data', () => {
        cy.get('#name').type('Jane Doe');
        cy.get('#email').type('jane.doe@example.com');
        cy.get('#mobile').type('0987654321');
        cy.get('#country').select('Canada');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Form submitted successfully');
        });
    });

    const testData = [
        {
            name: 'Alice Smith',
            email: 'alice.smith@example.com',
            mobile: '1234567890',
            country: 'United States',
            expectedAlert: 'Form submitted successfully'
        },
        {
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            mobile: '0987654321',
            country: 'Canada',
            expectedAlert: 'Form submitted successfully'
        },
        {
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com',
            mobile: '1122334455',
            country: 'Australia',
            expectedAlert: 'Form submitted successfully'
        }
    ];

    testData.forEach((data) => {
        it(`should submit the form successfully for ${data.name}`, () => {
            cy.get('#name').clear().type(data.name);
            cy.get('#email').clear().type(data.email);
            cy.get('#mobile').clear().type(data.mobile);
            cy.get('#country').select(data.country);
            cy.get('button[type="submit"]').click();
            cy.on('window:alert', (str) => {
                expect(str).to.equal(data.expectedAlert);
            });
        });
    });
});