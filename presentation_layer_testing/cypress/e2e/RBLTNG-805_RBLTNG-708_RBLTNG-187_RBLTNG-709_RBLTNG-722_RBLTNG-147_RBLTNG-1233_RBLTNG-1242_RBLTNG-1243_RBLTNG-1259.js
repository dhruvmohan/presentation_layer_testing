describe('RBLTNG-805_RBLTNG-708_RBLTNG-187_RBLTNG-709_RBLTNG-722_RBLTNG-147_RBLTNG-1233_RBLTNG-1242_RBLTNG-1243_RBLTNG-1259', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  var controlPointLocation;
  var SessionexpirationTimestamp;
  var refreshExpirationTimestamp;
 
  var FirstName
  var LastName

  var TrainCount = 0

  var myArray = new Array()

  var StatusRunning = 0
  var StatusPlanned = 0
  var StatusFinished = 0

  var Line = ""
  var TrainNumber = 0
  var Category = ""
  var RunningStatus = ""
  var DelayMinutes = 0

  var RandomTrainPick = 0
  
  var Length2 = 0

  var PlannedDepartureTime = ""
  var PlannedActualTime = ""

  var PlannedArrivalTime = ""
  var ActualArrivalTime = ""
  
  var Type = ""
  var isCustomerPoint = false


  // The trains and their runnuing status
  
  it('AK_01', () => {

    // Application URL should be accessible

    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')

 
    
   cy.get('.websso-btn').click()

   cy.wait('@apiCheck1').then(({response}) => {

    cy.wait(300000)

   expect(response.statusCode).to.eq(200);

   FirstName = response.body.data.login.firstname

   LastName = response.body.data.login.lastname

    if (FirstName == '' || LastName == '')

    {
      throw new Error("No User assigned")
    }

    else
    {
      cy.log('User assigned is ' + FirstName + ' ' + LastName)
    }

    cy.log(JSON.stringify(response.body.data.login.expirationTimestamp))
    
    SessionexpirationTimestamp= response.body.data.login.expirationTimestamp
    const c = new Date(SessionexpirationTimestamp)
    cy.log(c.toISOString())

    refreshExpirationTimestamp = response.body.data.login.refreshExpirationTimestamp
    const d = new Date(refreshExpirationTimestamp)
    cy.log(d.toISOString())

    const e = new Date(Date.now())
    cy.log(e.toISOString())

    controlPointLocation = JSON.stringify(response.body.data.login.controlPointLocation)

    if (controlPointLocation == '')

    {
      throw new Error("No Leitstelle assigned to the user. Please check.")
    }

    else
    {
      cy.log('The Leitstelle which the user assigned is'+ controlPointLocation)
    }

  })


    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait(10000)

   

    cy.wait('@apiCheck2') // discard


    
    cy.wait('@apiCheck2').then(({response}) => {

    cy.log(response.body)

    expect(response.statusCode).to.eq(200);
    
    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

    TrainCount = (response.body.data.trainOverview.length);

         
      for (let i = 0; i < TrainCount; i++) {

        Line = (response.body.data.trainOverview[i].line)

        TrainNumber = (response.body.data.trainOverview[i].trainNumber)

        Category = (response.body.data.trainOverview[i].category)

        RunningStatus = (response.body.data.trainOverview[i].runningStatus)

        DelaySeverity = (response.body.data.trainOverview[i].delaySeverity)

        DelayMinutes = (response.body.data.trainOverview[i].delayMinutes)

          
          if(Line==="")
          {

          throw new Error(TrainNumber + "Line number cannot be empty")
   
          }

          if(TrainNumber==="")
          {
            throw new Error(TrainNumber + "Trainnumber cannot be empty")
          }

          if(Category==="")
          {
            throw new Error(TrainNumber + "Category cannot be empty")
          }

          if(RunningStatus==="RUNNING" || RunningStatus==="PLANNED" || RunningStatus==="FINISHED")
          {
            if(RunningStatus==="RUNNING")
            {
                 StatusRunning++;
            }

            else if(RunningStatus==="PLANNED")
            {
                  StatusPlanned++;
            }

            else if(RunningStatus==="FINISHED")
            {
                  StatusFinished++;
                  
            }

          }
          else
          {
            throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }
                                   
           }
           cy.log("No. of trains in Running Status ="+StatusRunning)
           cy.log("No of trains in Planned Status ="+StatusPlanned)
           cy.log("No of trains in Finished Status ="+StatusFinished)
           
         /*  cy.get('.MuiTypography-root.MuiTypography-body1.css-1emg38j').eq(0).trigger('mouseover')

           cy.get("[aria-labelledby*='mui-']").should('exist')
         
           cy.get('[role="tooltip"]').then(elm => {
           
           const InnerText = elm[0].innerText;

            if(InnerText != 'Invalid'  || InnerText != 'Bahnhof'
            || InnerText != 'Haltepunkt'  || InnerText != 'Blockstelle'      
            ){
              cy.log(InnerText)
            }

            else {
              throw new Error("Please check the tooltip")
            }

          })*/

           RandomTrainPick = Math.floor(Math.random() * TrainCount)
           
           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()
            
            cy.wait('@apiCheck3').then(({response}) => {

            expect(response.statusCode).to.eq(200);

            cy.contains('Kundenfahrplan').should('exist')

         
            cy.contains('Betriebsfahrplan').should('exist')

            Line = (response.body.data.trainDetail.line)
            TrainNumber = (response.body.data.trainDetail.trainNumber)
            Category = (response.body.data.trainDetail.category)
            RunningStatus = (response.body.data.trainDetail.runningStatus)
            DelaySeverity = (response.body.data.trainDetail.delaySeverity)
            DelayMinutes = (response.body.data.trainDetail.delayMinutes)
            EventTime = (response.body.data.trainDetail.eventTime)

            Position = (response.body.data.trainDetail.position.ril100)
            LastStop = (response.body.data.trainDetail.relation[1].ril100)

           /*
            // Grey colour

             if(DelaySeverity==="URGENT" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
               cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Red colour
   
             else if(DelaySeverity==="URGENT" && RunningStatus!="PLANNED" && DelayMinutes >= 10)
             {
                 cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(254, 230, 230)')
             }
   
             // Grey colour
   
             else if(DelaySeverity==="MEDIUM" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Yellow colour
   
             else if(DelaySeverity==="MEDIUM" && RunningStatus!="PLANNED" && (DelayMinutes >=3  && DelayMinutes <= 9))
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-5zk67k').should('have.css', 'background-color', 'rgb(255, 244, 216)')
             }
   
             // Grey colour
      
             else if(DelaySeverity==="NORMAL" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Green colour
   
             else if(DelaySeverity==="NORMAL" && RunningStatus!="PLANNED" && (DelayMinutes >=0  && DelayMinutes <= 2))
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(235, 247, 221)')
             }    
   
             // Grey colour
   
             else if(DelaySeverity==="EARLY" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
      
             // Turquoise colour
   
             else if(DelaySeverity==="EARLY" && RunningStatus!="PLANNED" && DelayMinutes < 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(227, 245, 244)')
             }
           
   
             else
             {
               throw new Error("train details need to be checked")
   
               cy.log(DelaySeverity)
               cy.log(RunningStatus)
               cy.log(DelayMinutes)
      
             }  */

             if(RunningStatus=="FINISHED")
             {
                if (LastStop != Position)
                {
                  throw new Error("Actual Position of the train and LastStop are not the same")
                }
             }
/*
             Length2 = (response.body.data.trainDetail.timeTable.length)

             for (let i = 0; i < Length2; i++) {

              Type = (response.body.data.trainDetail.timeTable[i].type)
          
              isCustomerPoint = (response.body.data.trainDetail.timeTable[i].isCustomerPoint)

             if(Type!="Destination" && isCustomerPoint && (Type=="ArrivalDeparture" || Type=="Start"))
              {

              PlannedDepartureTime = (response.body.data.trainDetail.timeTable[i].departure.planned)
          
              ActualDepartureTime = (response.body.data.trainDetail.timeTable[i].departure.actual)

             if(PlannedDepartureTime==="" || ActualDepartureTime==="")
              {
               throw new Error("PlannedDepartureTime or ActualDepartureTime cannot be empty")
              }
              }

              if(Type!="Start" && isCustomerPoint && (Type=="ArrivalDeparture" || Type=="Destination"))
              {

              PlannedArrivalTime = (response.body.data.trainDetail.timeTable[i].arrival.planned)
         
              ActualArrivalTime = (response.body.data.trainDetail.timeTable[i].arrival.actual)

    
             if(PlannedArrivalTime==="" || ActualArrivalTime==="")
              {
               throw new Error("PlannedArrivalTime or ActualArrivalTime cannot be empty")
              }
              }
          }*/
          cy.contains('Betriebsfahrplan').click()




        })
    
    })

    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')

  
  })


  it('AK_02', () => {


    // Application URL should be accessible

    cy.visit(`${Cypress.config().baseUrl}/?`);

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck1')
    
   cy.get('.websso-btn').click()

   cy.wait('@apiCheck1').then(({response}) => {

   expect(response.statusCode).to.eq(200);

   FirstName = response.body.data.login.firstname

   LastName = response.body.data.login.lastname

    if (FirstName == '' || LastName == '')

    {
      throw new Error("No User assigned")
    }

    else
    {
      cy.log('User assigned is ' + FirstName + ' ' + LastName)
    }

    cy.log(JSON.stringify(response.body.data.login.expirationTimestamp))
    
    SessionexpirationTimestamp= response.body.data.login.expirationTimestamp
    const c = new Date(SessionexpirationTimestamp)
    cy.log(c.toISOString())

    refreshExpirationTimestamp = response.body.data.login.refreshExpirationTimestamp
    const d = new Date(refreshExpirationTimestamp)
    cy.log(d.toISOString())

    const e = new Date(Date.now())
    cy.log(e.toISOString())

    controlPointLocation = JSON.stringify(response.body.data.login.controlPointLocation)

    if (controlPointLocation == '')

    {
      throw new Error("No Leitstelle assigned to the user. Please check.")
    }

    else
    {
      cy.log('The Leitstelle which the user assigned is'+ controlPointLocation)
    }

  })

    cy.intercept({
      method: 'POST',
      path: '/api/v1'
    }).as('apiCheck2')

    cy.reload()

    cy.wait(10000)

    cy.wait('@apiCheck2') // discard

    
    cy.wait('@apiCheck2').then(({response}) => {

    cy.log(response.body)

    expect(response.statusCode).to.eq(200);
    
    cy.contains('RBL TNG').should('exist')

    cy.contains('Zugübersicht').should('exist')

    TrainCount = (response.body.data.trainOverview.length);

         
      for (let i = 0; i < TrainCount; i++) {

        Line = (response.body.data.trainOverview[i].line)

        TrainNumber = (response.body.data.trainOverview[i].trainNumber)

        Category = (response.body.data.trainOverview[i].category)

        RunningStatus = (response.body.data.trainOverview[i].runningStatus)

        DelaySeverity = (response.body.data.trainOverview[i].delaySeverity)

        DelayMinutes = (response.body.data.trainOverview[i].delayMinutes)

          
          if(Line==="")
          {

          throw new Error(TrainNumber + "Line number cannot be empty")
   
          }

          if(TrainNumber==="")
          {
            throw new Error(TrainNumber + "Trainnumber cannot be empty")
          }

          if(Category==="")
          {
            throw new Error(TrainNumber + "Category cannot be empty")
          }

          if(RunningStatus==="RUNNING" || RunningStatus==="PLANNED" || RunningStatus==="FINISHED")
          {
            if(RunningStatus==="RUNNING")
            {
                 StatusRunning++;
            }

            else if(RunningStatus==="PLANNED")
            {
                  StatusPlanned++;
            }

            else if(RunningStatus==="FINISHED")
            {
                  StatusFinished++;
                  
            }

          }
          else
          {
            throw new Error("Train does not have any RunningStatus from Planned, Running or Finished")
          }
                                   
           }
           cy.log("No. of trains in Running Status ="+StatusRunning)
           cy.log("No of trains in Planned Status ="+StatusPlanned)
           cy.log("No of trains in Finished Status ="+StatusFinished)
           
         /*  cy.get('.MuiTypography-root.MuiTypography-body1.css-1emg38j').eq(0).trigger('mouseover')

           cy.get("[aria-labelledby*='mui-']").should('exist')
         
           cy.get('[role="tooltip"]').then(elm => {
           
           const InnerText = elm[0].innerText;

            if(InnerText != 'Invalid'  || InnerText != 'Bahnhof'
            || InnerText != 'Haltepunkt'  || InnerText != 'Blockstelle'      
            ){
              cy.log(InnerText)
            }

            else {
              throw new Error("Please check the tooltip")
            }

          })*/

           RandomTrainPick = Math.floor(Math.random() * TrainCount)
           
           cy.intercept({
              method: 'POST',
              path: '/api/v1'
            }).as('apiCheck3')

            cy.get("[data-cy='SvgArrowRight']").eq(RandomTrainPick).click()
            
            cy.wait('@apiCheck3').then(({response}) => {

            expect(response.statusCode).to.eq(200);

            cy.contains('Kundenfahrplan').should('exist')

            cy.contains('Betriebsfahrplan').should('exist')

            Line = (response.body.data.trainDetail.line)
            TrainNumber = (response.body.data.trainDetail.trainNumber)
            Category = (response.body.data.trainDetail.category)
            RunningStatus = (response.body.data.trainDetail.runningStatus)
            DelaySeverity = (response.body.data.trainDetail.delaySeverity)
            DelayMinutes = (response.body.data.trainDetail.delayMinutes)
            EventTime = (response.body.data.trainDetail.eventTime)

            Position = (response.body.data.trainDetail.position.ril100)
            LastStop = (response.body.data.trainDetail.relation[1].ril100)

           /*
            // Grey colour

             if(DelaySeverity==="URGENT" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
               cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Red colour
   
             else if(DelaySeverity==="URGENT" && RunningStatus!="PLANNED" && DelayMinutes >= 10)
             {
                 cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(254, 230, 230)')
             }
   
             // Grey colour
   
             else if(DelaySeverity==="MEDIUM" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Yellow colour
   
             else if(DelaySeverity==="MEDIUM" && RunningStatus!="PLANNED" && (DelayMinutes >=3  && DelayMinutes <= 9))
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-5zk67k').should('have.css', 'background-color', 'rgb(255, 244, 216)')
             }
   
             // Grey colour
      
             else if(DelaySeverity==="NORMAL" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
   
             // Green colour
   
             else if(DelaySeverity==="NORMAL" && RunningStatus!="PLANNED" && (DelayMinutes >=0  && DelayMinutes <= 2))
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(235, 247, 221)')
             }    
   
             // Grey colour
   
             else if(DelaySeverity==="EARLY" && RunningStatus==="PLANNED" && DelayMinutes == 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(240, 243, 245)')
             }
      
             // Turquoise colour
   
             else if(DelaySeverity==="EARLY" && RunningStatus!="PLANNED" && DelayMinutes < 0)
             {
              cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignRight.MuiTableCell-sizeMedium.css-1w7nudq').should('have.css', 'background-color', 'rgb(227, 245, 244)')
             }
           
   
             else
             {
               throw new Error("train details need to be checked")
   
               cy.log(DelaySeverity)
               cy.log(RunningStatus)
               cy.log(DelayMinutes)
      
             }  */

             if(RunningStatus=="FINISHED")
             {
                if (LastStop != Position)
                {
                  throw new Error("Actual Position of the train and LastStop are not the same")
                }
             }
/*
             Length2 = (response.body.data.trainDetail.timeTable.length)

             for (let i = 0; i < Length2; i++) {

              Type = (response.body.data.trainDetail.timeTable[i].type)
          
              isCustomerPoint = (response.body.data.trainDetail.timeTable[i].isCustomerPoint)

             if(Type!="Destination" && isCustomerPoint && (Type=="ArrivalDeparture" || Type=="Start"))
              {

              PlannedDepartureTime = (response.body.data.trainDetail.timeTable[i].departure.planned)
          
              ActualDepartureTime = (response.body.data.trainDetail.timeTable[i].departure.actual)

             if(PlannedDepartureTime==="" || ActualDepartureTime==="")
              {
               throw new Error("PlannedDepartureTime or ActualDepartureTime cannot be empty")
              }
              }

              if(Type!="Start" && isCustomerPoint && (Type=="ArrivalDeparture" || Type=="Destination"))
              {

              PlannedArrivalTime = (response.body.data.trainDetail.timeTable[i].arrival.planned)
         
              ActualArrivalTime = (response.body.data.trainDetail.timeTable[i].arrival.actual)

    
             if(PlannedArrivalTime==="" || ActualArrivalTime==="")
              {
               throw new Error("PlannedArrivalTime or ActualArrivalTime cannot be empty")
              }
              }
          }*/
          cy.contains('Betriebsfahrplan').click()




        })
    
    })
    cy.get("[data-cy='SvgArrowDown']").eq(0).click()

    cy.contains('Abmelden').click()

    cy.get('#usr-msg').should('contain', 'Erfolgreich abgemeldet')
  
  })

 


})