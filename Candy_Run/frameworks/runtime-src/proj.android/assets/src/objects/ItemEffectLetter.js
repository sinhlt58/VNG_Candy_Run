/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectLetter = ItemEffect.extend({
    bonusTimeString:null,
    ctor:function () {
        this.bonusTimeString = {
            "B" : 0,
            "O" : 0,
            "N" : 0,
            "U"  : 0,
            "S"  : 0,
            "T"  : 0,
            "I"  : 0,
            "M"  : 0,
            "E"  : 0
        };

        this._super();
    },
    doEffect:function (game, world, item) {
        this.increseLetter(item.letter)
    },
    increseLetter:function (letter) {
        if (this.bonusTimeString.hasOwnProperty(letter))
            this.bonusTimeString[letter]++;
    },
    resetLetters:function () {
        for (var letter in this.bonusTimeString){
            if (this.bonusTimeString.hasOwnProperty(letter)){
                this.bonusTimeString[letter] = 0;
            }
        }
    },
    isFullString:function () {
        for (var letter in this.bonusTimeString){
            if (this.bonusTimeString.hasOwnProperty(letter)){
                if(this.bonusTimeString[letter] <= 0)
                    return false;
            }
        }
        return true;
    },
    getCountByLetter:function (letter) {
        if (this.bonusTimeString.hasOwnProperty(letter))
            return this.bonusTimeString[letter];
        return 0;
    }
});