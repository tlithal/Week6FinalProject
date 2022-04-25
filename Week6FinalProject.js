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

    describe()
    {
        return `${this.value} of ${this.suit} with a value of ${this.value}`;
    }
}

//Creates a class for the Deck object which will hold the cards
class Deck {
    constructor()
    {
        //Creates an empty array to hold the cards and creates 2 constant arrays to hold the suits and names of the cards
        this.cards = [];
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
}

let deck1 = new Deck();
deck1.shuffle();
console.log(deck1);