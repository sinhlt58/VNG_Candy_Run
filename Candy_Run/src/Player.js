/**
 * Created by Fresher on 28/12/2016.
 */
var Player = cc.Class.extend({
    currentCharacterId: null,
    currentPetId: null,
    currentMoney: null,
    currentScore:0,
    characters: null,
    pets: null,
    pCurrentCharacter:null,
    ctor: function () {
        //read files here.
        this.currentMoney = 100000;
    },
    increaseMoney:function (amount) {
        this.currentMoney += amount;
    },
    increaseScore:function (amount) {
        this.currentScore += amount;
    },
    getMoney:function () {
        return this.currentMoney;
    },
    getScore:function () {
        return this.currentScore;
    }
});