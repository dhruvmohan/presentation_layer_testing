
describe('ms_dev_mon', () => {

    it('ms_dev_mon', () => {
  
    let Journey_ID ; 
  
     var test = "[\n    {\n        \"ril100\": \"BADL\",\n        \"runningPointType\": 4\n    },\n    {\n        \"ril100\": \"BADL\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BAF\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BAGL\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BAGL\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BAHU\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BAKS\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BAKS\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BALX\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BARF\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BARF\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BATS\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BATS\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BBAB\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BBDF\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BBDF\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BBEU\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BBEV\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BBEV\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BBFD\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BBFE\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BBFE\",\n        \"runningPointType\": 2\n    },\n    {\n        \"ril100\": \"BBGT\",\n        \"runningPointType\": 3\n    },\n    {\n        \"ril100\": \"BAGL\",\n        \"runningPointType\": 1\n    },\n    {\n        \"ril100\": \"BAGL\",\n        \"runningPointType\": 5\n    }\n]"
  
      cy.request({
        method: 'POST', 
        url: 'https://ms-dev-mon.rbl-test.comp.db.de:3000/api/v1/create-timetable', 
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: test
  
      })
      .then ((response) => {
  
        cy.log(response.status) // 201
        cy.log(response.duration) // 11
        cy.log(response.body) 
        Journey_ID = response.body.journeyId
        cy.log(Journey_ID) 
        cy.wrap(Journey_ID).as('Journey_ID');
  
       });

       cy.get('@Journey_ID').then(Journey_ID => {
  
       var test1 = '{\n    \"startRil100\": \"BADL\",\n    \"currentRil100\": \"BAGL\",\n    \"delay\": 600,\n    \"journeyId\": \"'+Journey_ID+'\",\n    \"runningPointType\": 1\n}'
  
       cy.request({
        method: 'POST', 
        url: 'https://ms-dev-mon.rbl-test.comp.db.de:3000/api/v1/create-journeys', 
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: test1
  
      })
      .then( (board) => {
  
        cy.log(board.status) // 201
        cy.log(board.duration) // 11
        cy.log(board.body) 
      
      })
    })
    })
  
  })