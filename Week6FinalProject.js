//Creates class for the Card object
class Card {
    constructor(name, suit)
    {
        //Assigns name/suit to card and determines values based on if it is a number or a Face card. Ace will be low for this game
        this.name = name;
        this.suit = suit;
        
        if(name == 'Ace')
        {
            this.value = 1;
        }
        else if(name == 'Jack')
        {
            this.value = 11;
        }
        else if(name == 'Queen')
        {
            this.value = 12;
        }
        else if(name == 'King')
        {
            this.value = 13;
        }
        else{
            this.value = this.name;
        }
    }

    //Basic info about the card, will be used to display output during the game
    describe()
    {
        return `${this.name} of ${this.suit}`;
    }
}

//Creates a class for the Deck object which will hold the cards
class Deck {
    constructor()
    {
        //Creates an empty array to hold the cards and creates 2 constant arrays to hold the suits and names of the cards
        this.cards = [];
        this.deck1 = [];
        this.deck2 = [];
        const suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
        const names = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        /*Loops through the suits array and for each of the suits, loops through the names array to assign 1 card per name to each suit
        and pushes the cards into the cards array*/
        for(let x = 0; x < suits.length; x++)
        {
            for(let i = 0; i < names.length; i++)
            {
                let card = new Card(names[i], suits[x]);
                this.cards.push(card);
            }
        }

    }

    //Shuffles the deck so that the cards are random
    shuffle()
    {
        for(let i = this.cards.length - 1; i > 0; i--)
        {

            /*Math.random returns a number from 0 - 1 but not including 1. by setting it to multiply by i, it will increase the range from 0 to less than length of the cards array
            so that we can iterate through all possible locations of the array.

            Math.floor returns the integer less than or equal to the number given.
            We assign that number to the math.random number so that it will always be up to the length of the cards array
            */
            let x = Math.floor(Math.random() * i);

            /*We assign a temp location to hold the current object we want to replace, we then change that object to the random place we calculated above, 
            and then we assign the one we replaced with the temp location so the 2 values swapped positions*/
            
            let temp = this.cards[i];
            this.cards[i] = this.cards[x];
            this.cards[x] = temp;
        }
    }

    //Splits the deck in half and assigns the 2 different arrays to the decks that will be given to the players
    cut()
    {
        this.deck1 = this.cards.splice(0, 26);
        this.deck2 = this.cards;
    }

}

class Player {
    constructor(deck)
    {
        this.score = 0;
        this.deck = deck;
        this.selectedCard = null;
    }

    /* Takes out an element of the deck array and returns that object (a card)
    Once there are no more cards, display a message saying there are no more cards */
    draw()
    {
        if(this.deck.length > 0)
        {
            return this.deck.pop();
        }
        else{
            return "There are no more cards in your hand";
        }

    }

    //Adds a point to the player
    addPoint()
    {
        this.score += 1;
    }
}

class Game {
    constructor(player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.output = '';
        this.winner = null;
    }

    //Starts the game
    start()
    {

        /* As long as there are cards in one of the players hand, each player will draw a card and it will document that in the output log
        as a running total that will be outputed in the results method */
        while(this.player1.deck.length > 0 && this.player2.deck.length > 0)
        {
            let player1Card = this.player1.draw();
            let player2Card = this.player2.draw();

            this.output += `Player 1 has drawn a ${player1Card.describe()}, Player 2 has drawn a ${player2Card.describe()} <br>`;

            //Compares the values of the cards drawn, and adds points according to which player won the draw
            if(player1Card.value > player2Card.value)
            {
                this.player1.addPoint();
                this.output += `Player 1 gets 1 point <br><br>`;
            }
            else if(player2Card.value > player1Card.value)
            {
                this.player2.addPoint();
                this.output += `Player 2 gets 1 point <br><br>`;
            }
            else{
                this.output += `It was a tie, no points given <br><br>`;
            }
            
        }

        /* After the decks are empty for the players, it will compare the scores of the 2 players and the winner will be logged into the 'output' and 'winner'
        'winner' is used to display the player that won in the alert box, 'output' gets outputted into the HTML */
        if(this.player1.score > this.player2.score)
        {
            this.output += `The game has ended, Player 1 is the winner!`;
            this.winner = 'Player 1 has won!'
        }
        else if(this.player2.score > this.player1.score){
            this.output += `The game has ended, Player 2 is the winner!`;
            this.winner = 'Player 2 has won!'
        } else{
            this.output += `The game has ended, it was a tie!`;
            this.winner = 'It was a tie!'
        }


        this.results();
    }

    /*Displays the score and the game output into the HTML webpage directly
    Also displays a pop up alert with the ending notification and winner */
    results()
    {
        document.getElementById('player1').innerHTML = `Player 1: ${this.player1.score}`;
        document.getElementById('player2').innerHTML = `Player 2: ${this.player2.score}`;
        document.getElementById('winner').innerHTML = `The game has ended!, ${this.winner}`;
        document.getElementById('testing').innerHTML = this.output;
        alert(`The game has ended!, ${this.winner}`);
    }
}

//Function to setup the elements of the game and start it

function gameSetup() {
    //Initializes the deck, randomizes it and then splits it in half
    let deck = new Deck();
    deck.shuffle();
    deck.cut();

    //Assign the split deck into 2 separate decks to give to each player
    let deck1 = deck.deck1;
    let deck2 = deck.deck2;

    //Initializes 2 players with a deck each
    let firstPlayer = new Player(deck1);
    let secondPlayer = new Player(deck2);

    //Initializes the game with the 2 players created
    let game = new Game(firstPlayer, secondPlayer);

    game.start();
}

/* Function to clear the HTML of the logs, not needed since gameSetup will overwrite old HTML with new game,
but used for Player clarity when using program. */

function gameClear() {
    document.getElementById('player1').innerHTML = '';
    document.getElementById('player2').innerHTML = '';
    document.getElementById('winner').innerHTML = '';
    document.getElementById('testing').innerHTML = '';

}