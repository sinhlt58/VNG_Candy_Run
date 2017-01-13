/**
 * Created by Fresher on 13/01/2017.
 */

//this state make item follow character
var StateItemBeAttracted = {



    velocity: 500,
    onEnter: function (item) {

    },
    update: function (dt, item, character) {
        var currentItemPos = item.sprite.getPosition();

        var charPos = character.getPosition();
        var centerChaPos = cc.p(charPos.x + character.getContentSize().width / 2,
            charPos.y + character.getContentSize().height / 2);


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
}