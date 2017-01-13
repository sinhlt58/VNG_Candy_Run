/**
 * Created by Fresher on 1/11/2017.
 */
var SkillPetHPRate = cc.Class.extend({
    ctor:function () {

    },
    init:function (character) {
        character.decreasingHPRate -= character.decreasingHPRate*0.5;
    },
    update:function (character) {
        cc.log("insidide SkillPetHPRate");
    }
});