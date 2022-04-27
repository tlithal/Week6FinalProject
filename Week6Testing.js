var expect = chai.expect;
var testDeck = [1, 3, 5, 7, 9];
var badDeck = [];
var testPlayer = new Player(testDeck);
var badPlayer = new Player(badDeck);

describe('DrawFunction', function() {
    describe('#draw', function() {
        it('should pop a card from the array', function() {
            var testDraw = testPlayer.draw();
            expect(testDraw).to.equal(9);
        });

        it('should throw an error if deck is empty', function() {
            expect(badPlayer.draw()).to.equal('There are no more cards in your hand');
        });
    });
});