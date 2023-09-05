

class HomePage {
  constructor()

  {

    var wrappingtext 

    var FirstName

    var LastName
  
    var SessionexpirationTimestamp
  
    var refreshExpirationTimestamp
    
    var controlPointLocation

    var TrainCount
    
    var StatusRunning = 0
    var StatusPlanned = 0
    var StatusFinished = 0

    var Line = ""
    var TrainNumber = 0
    var Category = ""
    var RunningStatus = ""
    var DelayMinutes = 0

    var RandomTrainPick = 0
    
  }

 
apicheck()
{
    cy.intercept({
        method: 'POST',
        path: '/api/v1'
      }).as('apiCheck')

}

apicheck1()
{
    cy.intercept({
        method: 'POST',
        path: '/api/v1'
      }).as('apiCheck1')

}

checkLoginDetails(){

        cy.wait('@apiCheck').then(({response}) => {

        expect(response.statusCode).to.eq(200);

 
  //      cy.log(JSON.stringify(response))


       this.wrappingtext = 'wrappingtext'     

       this.FirstName = response.body.data.login.firstname

       this.LastName = response.body.data.login.lastname
    
         
    if (this.FirstName == '' || this.LastName == '')

    {
      throw new Error("No User assigned")
    }

    else
    {
      cy.log('User assigned is ' + this.FirstName + ' ' + this.LastName)
    }

    cy.log(JSON.stringify(response.body.data.login.expirationTimestamp))
    
    this.SessionexpirationTimestamp= response.body.data.login.expirationTimestamp
    const c = new Date(this.SessionexpirationTimestamp)
    cy.log(c.toISOString())

    this.refreshExpirationTimestamp = response.body.data.login.refreshExpirationTimestamp
    const d = new Date(this.refreshExpirationTimestamp)
    cy.log(d.toISOString())

 //   const e = new Date(Date.now())
 //   cy.log(e.toISOString())


    this.controlPointLocation = JSON.stringify(response.body.data.login.controlPointLocation)

    if (this.controlPointLocation == '')

    {
      throw new Error("No Leitstelle assigned to the user. Please check.")
    }

    else
    {
      cy.log('The Leitstelle which the user assigned is'+ this.controlPointLocation)
    }

    cy.wrap(this.wrappingtext).as('wrappingtext');

    cy.wrap(this.FirstName).as('FirstName');
    
    cy.wrap(this.LastName).as('LastName');


        
    })
}

reload()
{
  cy.reload()
}


checkTab(){
    cy.get("[aria-label='Abw']").should('contain', 'Abw')
}

checkTags()
{
    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')
}

trainCount()
{
    cy.wait('@apiCheck1').then(({response}) => {

    expect(response.statusCode).to.eq(200);


    cy.log(JSON.stringify(response.body.data.trainOverview))
/*
    this.TrainCount =  (response.body.data.trainOverview.length);

    cy.log(this.TrainCount)

    for (let i = 0; i < this.TrainCount; i++) {

        this.Line = (response.body.data.trainOverview[i].line)

        this.TrainNumber = (response.body.data.trainOverview[i].trainNumber)

        this.Category = (response.body.data.trainOverview[i].category)

        this.RunningStatus = (response.body.data.trainOverview[i].runningStatus)

        this.DelaySeverity = (response.body.data.trainOverview[i].delaySeverity)

        this.DelayMinutes = (response.body.data.trainOverview[i].delayMinutes)

          
          if(this.Line==="")
          {

          throw new Error(this.TrainNumber + "Line number cannot be empty")
   
          }

          if(this.TrainNumber==="")
          {
            throw new Error(this.TrainNumber + "Trainnumber cannot be empty")
          }

          if(this.Category==="")
          {
            throw new Error(this.TrainNumber + "Category cannot be empty")
          }

          if(this.RunningStatus==="RUNNING" || this.RunningStatus==="PLANNED" || this.RunningStatus==="FINISHED")
          {
            if(this.RunningStatus==="RUNNING")
            {
              this.StatusRunning++;
            }

            else if(this.RunningStatus==="PLANNED")
            {
              this.StatusPlanned++;
            }

            else if(this.RunningStatus==="FINISHED")
            {
              this.StatusFinished++;
                  
            }

          }
          else
          {
            throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }
                                   
           }
           cy.log("No. of trains in Running Status ="+this.StatusRunning)
           cy.log("No of trains in Planned Status ="+this.StatusPlanned)
           cy.log("No of trains in Finished Status ="+this.StatusFinished)
           */
          })

}


selectRandomTrain()
{

  cy.wait('@apiCheck').then(({response}) => {

    expect(response.statusCode).to.eq(200);


  cy.get("[data-cy='SvgArrowRight']").eq(1).click()



//    cy.get('@wrappingtext').then(wrappingtext => {

//        cy.log(wrappingtext)

 //       RandomTrainPick = Math.floor(Math.random() * this.HomePageTrainCount)
 //       cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()

 //   })
 
})

}



}
export default HomePage