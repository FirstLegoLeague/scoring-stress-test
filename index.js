const axios = require('axios')
const {createScore} = require('./scores')

const BASE_URL = 'http://localhost'
const TOURNAMENT_PORT = '2833'
const SCORING_PORT = '2832'

const GET_TEAMS_ROUTE = '/team/all'
const CREATE_SCORE_ROUTE = '/scores/create'

const STAGE = 'ranking'

/************* - Please change only inside this box - **************/
/*******************************************************************/
/**/                                                             /**/
/**/         // Change the round number here                     /**/
/**/         const ROUND = 1                                 /**/
/**/                                                             /**/
/**/         // Change the amount of seconds between scores      /**/
/**/         const TIME_BETWEEN_SCORES = 1                      /**/
/**/                                                             /**/
/**/         // Amount of 'Scorekeepers'                         /**/
/**/         const AMOUNT_OF_SKS = 2                    /**/
/**/                                                             /**/
/*******************************************************************/

// Getting all the teams for tournament
axios.get(createUrl(TOURNAMENT_PORT, GET_TEAMS_ROUTE))
  .then(data => data.data)
  .then(teams => {
    let timeoutIndex = 0

    // Scheduling score creations for teams
    for (let i = 0; i < teams.length; i++) {
      for (let scorekeeper = 1; scorekeeper <= AMOUNT_OF_SKS; scorekeeper++) {
        let team = teams[i]
        setTimeout(() => {
          createScoreForTeam(team)
        }, timeoutIndex * TIME_BETWEEN_SCORES * 1000)

        i++
      }
      timeoutIndex++
    }
  })

function createScoreForTeam (team) {
  console.log(`Creating score for team #${team.number} in ${STAGE} #${ROUND}`)

  createScore(team.number, ROUND, STAGE, 0).then(score => {
    // Sending POST request to the Scoring Serer
    axios.post(createUrl(SCORING_PORT, CREATE_SCORE_ROUTE), score).then(res => {
      // Checking for the right status
      if (res.status === 201) {
        console.log(`Score for team #${team.number} in ${STAGE} #${ROUND} created!`)
      }
    }).catch(err => {
      console.warn(`Can't create score for team #${team.number} in ${STAGE} #${ROUND}. ${err.message}`)
    })
  })
}

function createUrl (port, route) {
  return BASE_URL + ':' + port + route
}
