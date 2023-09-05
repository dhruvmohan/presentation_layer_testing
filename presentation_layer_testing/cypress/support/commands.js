// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', { filePath: inputFile })
    });

Cypress.Commands.add('login', (overrides = {}) => {
        Cypress.log({
          name: 'loginViaAuth0',
        });
      


const options = {
          method: 'POST',
          headers: 
          {
          'Content-Type': 'application/x-www-form-urlencoded'
         },
          url: Cypress.env('auth_url'),
          body: {
            grant_type: Cypress.env('granttype'),
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),  
            audience: Cypress.env('auth_audience'),
            token_content_type: 'jwt',
            scope: 'openid profile email',
            client_id: Cypress.env('auth_client_id'),
            client_secret: Cypress.env('auth_client_secret'),
            redirect_uri: 'https://release01.rbl-test.comp.db.de',
            code: 'cf6c777d82e31f2f8fed8468cedce2d66454c33842674aeb2ab391e382b2c1c8'
          },
        };
/*
        const options = {
          method: 'POST',
          headers: 
          {
          'Content-Type': 'application/x-www-form-urlencoded'
         },
          url: 'https://sso.test.service.deutschebahn.com/f5-oauth2/v1/token',
          body: {
            code: '9a9c79678db7b24beed69b41eaba05643eb172bd81f7b57a6eaa60c9208026ae',
            redirect_uri: 'https://release01.rbl-test.comp.db.de',
            client_id: '89dfe16727e9c31ee11ae20f9e2202a0ec57b00cf5433462',
            grant_type: 'authorization_code',
            token_content_type: 'jwt',
            client_secret: '0c41e0ab7ec9a208176d457f78667fa0c27d3bc4a76d02a0ec57b00cf5433462'
          },
        };*/

        cy.request(options);
      });






/*
      Cypress.Commands.add('test', (overrides = {}) => {
        Cypress.log({
          name: 'access token',
        });
      


const options = {
          method: 'POST',
          headers: 
          {
          'Content-Type': 'application/x-www-form-urlencoded'
         },
          url: Cypress.env('auth_url'),
          body: {
            grant_type: Cypress.env('granttype'),
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),  
            audience: Cypress.env('auth_audience'),
            token_content_type: 'jwt',
            scope: 'openid profile email',
            client_id: Cypress.env('auth_client_id'),
            client_secret: Cypress.env('auth_client_secret'),
            redirect_uri: 'https://release01.rbl-test.comp.db.de',
            code: 'cf6c777d82e31f2f8fed8468cedce2d66454c33842674aeb2ab391e382b2c1c8'
          },
        };



        const options = {
          method: 'GET',
          headers: 
          {
          'Content-Type': 'application/x-www-form-urlencoded'
         },
          url: 'https://sso.test.service.deutschebahn.com/f5-oauth2/v1/authorize?scope=Username&redirect_uri=https://release01.rbl-test.comp.db.de&response_type=code&client_id=89dfe16727e9c31ee11ae20f9e2202a0ec57b00cf5433462'
        };
   

        cy.request(options);
      });*/


      Cypress.Commands.add('loginbutton', (button) => {

        cy.visit(`${Cypress.config().baseUrl}/?`);

        cy.intercept({
          method: 'POST',
          path: '/api/v1'
        }).as('apiCheck1')
        
        cy.get(button).click()
        
        })
