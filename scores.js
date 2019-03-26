'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const RANDOM_ID_LENGTH = 24
const SCORE_TEMPLATE_PATH = './score.json'

function createScore (teamNumber, round, stage, tableId) {
  return fs.readFileAsync(SCORE_TEMPLATE_PATH, 'utf8')
    .then(text => {
      return JSON.parse(text)
    })
    .then(scoreTemplate => {
      scoreTemplate.teamNumber = teamNumber
      scoreTemplate.round = round
      scoreTemplate.stage= stage
      scoreTemplate.tableId = tableId
      scoreTemplate.matchId = createRandomId(RANDOM_ID_LENGTH)

      return scoreTemplate
    })
}

function createRandomId (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}

module.exports = {
  createScore
}
