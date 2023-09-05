

// type definitions for Cypress object "cy"
// <reference types="cypress" />

// import { home } from 'ospath';
import  Detail  from '../Detail.js';
import  HomePage  from '../HomePage.js';
import  Login  from '../Login.js';



describe('PageObjectModel', () => {


  it('PageObjectModel', () => {

 

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  
    const detail=new Detail();
   
    const homePage=new HomePage();

    const login=new Login();

    login.GotoBaseURL() 

    homePage.apicheck()

    login.ClickLoginButton()

    homePage.checkLoginDetails()

    homePage.apicheck1()

    homePage.reload()

    homePage.trainCount()

    homePage.checkTab()

    homePage.checkTags()
    
    homePage.selectRandomTrain()

    detail.ZurückZurZugübersicht()

    login.Logout()
    
 })

})