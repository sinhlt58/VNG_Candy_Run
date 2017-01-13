/**
 * Created by Fresher on 13/01/2017.
 */

//this state make item follow character
var StateItemBeAttracted = cc.Class.extend({


    character: null,

    velocity: null,

    ctor: function (character) {
        this.character = character;
        this.velocity = 500;
    },

    onEnter: function (item) {

    },
    update: function (dt, item) {
        var currentItemPos = item.sprite.getPosition();

        var charPos = this.character.getPosition();
        var centerChaPos = cc.p(charPos.x + this.character.getContentSize().width / 2,
            charPos.y + this.character.getContentSize().height / 2);


        var distance = {
            x: centerChaPos.x - item.sprite.getPosition().x,
            y: centerChaPos.y - item.sprite.getPosition().y
        };
        var distanceLength = Math.sqrt(distance.x * distance.x + distance.y * distance.y);
        var distanceNormalized = {
            x: distance.x / distanceLength,
            y: distance.y / distanceLength
        };
        var destinationPosItem = {
            x: currentItemPos.x + dt * this.velocity * distanceNormalized.x,
            y: currentItemPos.y + dt * this.velocity * distanceNormalized.y
        };
        item.sprite.setPosition(destinationPosItem);


    },
    onExit: function (item) {

    }
});