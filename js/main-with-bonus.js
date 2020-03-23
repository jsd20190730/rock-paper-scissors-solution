$(function () {
  let userScore = 0
  let botScore = 0

  let userRoundsWon = 0
  let botRoundsWon = 0

  let consecutiveUserWins = 0
  let consecutiveBotWins = 0

  const choices = ['rock', 'paper', 'scissors']

  $('#rock').click(function () {
    const botChoice = generateBotChoice()
    compare('rock', botChoice)
  })

  $('#scissors').click(function () {
    const botChoice = generateBotChoice()
    compare('scissors', botChoice)
  })

  $('#paper').click(function () {
    const botChoice = generateBotChoice()
    compare('paper', botChoice)
  })

  function generateBotChoice () {
    // generate random index from 0 to 2 to extract random computer choice
    // from the choices array
    return choices[Math.floor(Math.random() * choices.length)]
  }

  function compare (userChoice, botChoice) {
    clearAlertMessages()
    let userResult

    if (userChoice === botChoice) {
      userResult = 'tie'
    } else if (userChoice === 'rock' && botChoice === 'scissors') {
      userResult = 'win'
      userScore++
    } else if (userChoice === 'rock' && botChoice === 'paper') {
      userResult = 'lose'
      botScore++
    } else if (userChoice === 'paper' && botChoice === 'rock') {
      userResult = 'win'
      userScore++
    } else if (userChoice === 'paper' && botChoice === 'scissors') {
      userResult = 'lose'
      botScore++
    } else if (userChoice === 'scissors' && botChoice === 'paper') {
      userResult = 'win'
      userScore++
    } else if (userChoice === 'scissors' && botChoice === 'rock') {
      userResult = 'lose'
      botScore++
    } else {
      console.log('something wrong happened!')
    }

    printScore()
    printMessage(userChoice, botChoice, userResult)
    checkConsecutiveWinCount(userResult)
    checkForRoundWinner()
  }

  function checkConsecutiveWinCount (userResult) {
    if (userResult === 'win') {
      consecutiveUserWins += 1
      consecutiveBotWins = 0
    } else if (userResult === 'lose') {
      consecutiveUserWins = 0
      consecutiveBotWins += 1
    } else {
      true
    }

    if (consecutiveUserWins === 3) {
      userScore += 2
      bonusAlertMessage('You scored 3 in a row, bonus +2')
      resetConsecutiveWinCount()
      printScore()
    } else if (consecutiveBotWins === 3) {
      botScore += 2
      bonusAlertMessage('Bot scored 3 in a row, bonus +2')
      resetConsecutiveWinCount()
      printScore()
    } else {
      true
    }
  }

  function resetScores () {
    userScore = 0
    botScore = 0
  }

  function resetRoundScores () {
    userRoundsWon = 0
    botRoundsWon = 0
  }

  function resetConsecutiveWinCount () {
    consecutiveUserWins = 0
    consecutiveBotWins = 0
  }

  function checkForRoundWinner () {
    if (userScore >= 10) {
      userRoundsWon += 1
      alertMessage(`You won the round! ${userRoundsWon} - ${botRoundsWon}`)
      resetScores()
    } else if (botScore >= 10) {
      botRoundsWon += 1
      alertMessage(`You lost the round. ${userRoundsWon} - ${botRoundsWon}`)
      resetScores()
    } else {
      true
    }

    printRoundScore()
    checkForGameWinner()
  }

  function checkForGameWinner () {
    if (userRoundsWon === 2) {
      alertMessage(`You won best 2 out of 3 :) (${userRoundsWon} - ${botRoundsWon})`)
      resetRoundScores()
    } else if (botRoundsWon === 2) {
      alertMessage(`You lost best 2 out of 3 :( (${userRoundsWon} - ${botRoundsWon})`)
      resetRoundScores()
    } else {
      true
    }
  }

  function alertMessage (message) {
    $('.alert').text(message)
  }

  function bonusAlertMessage (message) {
    $('.bonus-alert').text(message)
  }

  function clearAlertMessages () {
    $('.alert').html('&nbsp;')
    $('.bonus-alert').html('&nbsp;')
  }

  function printRoundScore () {
    $('#humanRoundsWon').text(userRoundsWon)
    $('#computerRoundsWon').text(botRoundsWon)
  }

  function printScore () {
    $('#humanScore').text(userScore)
    $('#computerScore').text(botScore)
  }

  function printMessage (userChoice, botChoice, userResult) {
    let message = (
      `<p>
        You played <strong> ${userChoice}</strong>.
        The bot played <strong>${botChoice}</strong>.
      </p>`
    )

    if (userResult === 'win') {
      message = `${message}  <p>You Win! :)</p>`
    } else if (userResult === 'lose') {
      message = `${message} <p>You Lose :( </p> `
    } else {
      message = `${message} <p>You tied :| </p>`
    }

    $('#status').html(message)
  }
})
