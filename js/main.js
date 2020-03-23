$(function () {
  let userScore = 0
  let botScore = 0

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
      message = message + ' <p>You Win! :)</p>'
    } else if (userResult === 'lose') {
      message = message + ' <p>You Lose :( </p>'
    } else {
      message = message + ' <p>You tied</p>'
    }

    $('#status').html(message)
  }
})
