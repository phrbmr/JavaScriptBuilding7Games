document.addEventListener('DOMContentLoaded', () => {
  
  //list of images from the cards and the top
  //name and relative path (images/...)
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random()) // randomize the card position

  const grid = document.querySelector('.grid') //pickup element with class name grid from the html
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []     // empty array of cards chosen
  let cardsChosenId = []   // empty array of cards chosen ID
  let cardsWon = []

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {   //looping over the card array
      const card = document.createElement('img')   //creating an image element for each card
      card.setAttribute('src', 'images/blank.png') //link to the image
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard) //if the card is clicked invoke flipCard function
      grid.appendChild(card)  //putting the images in the grid using append
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img') // pick all images
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) { // check with the images match
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png') //change both to white
      cards[optionTwoId].setAttribute('src', 'images/white.png') //change both to white
      cards[optionOneId].removeEventListener('click', flipCard)  //remove click
      cards[optionTwoId].removeEventListener('click', flipCard)  //remove click
      cardsWon.push(cardsChosen)
    } else {                   // if it does not match
      cards[optionOneId].setAttribute('src', 'images/blank.png') //flip back
      cards[optionTwoId].setAttribute('src', 'images/blank.png') //flip back
      alert('Sorry, try again')
    }
    cardsChosen = []    // clear the array to pick again
    cardsChosenId = []  // clear the array to pick again
    resultDisplay.textContent = cardsWon.length //show the score based on the array of cards won
    if  (cardsWon.length === cardArray.length/2) { // if all picked, alert the player
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')  // variable of card ID from above
    cardsChosen.push(cardArray[cardId].name)   // push th cards from the card away based on ID
    cardsChosenId.push(cardId)                 // push th cards from the card away based on ID
    this.setAttribute('src', cardArray[cardId].img) // put card in the grid when chosen
    if (cardsChosen.length ===2) {             // limits to 2 cards per play
      setTimeout(checkForMatch, 500)           // check for match (time out to slow a little)
    }
  }

  createBoard()
})
