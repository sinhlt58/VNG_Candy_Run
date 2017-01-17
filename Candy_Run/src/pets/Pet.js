/**
 * Created by Fresher on 1/11/2017.
 */
var Pet = cc.Class.extend({
    skillId: null,
    character: null,
    sprite: null,


    velocity: null,

    ctor: function () {

    },
    update: function (dt) {
        //todo: update movement later for realistic


        //if(Math.abs(this.sprite.getPosition().y - this.character.getPo))

        this.velocity = 200;

        var characterPos = this.character.getPosition();
        var destination = cc.p(characterPos.x - 100, characterPos.y + 120);


        //var velocity = 100;

        var distance = characterPos.y + 120 - this.sprite.getPosition().y;


        if (Math.abs(distance) <= 0.01) {
            this.sprite.setPosition(destination);
            return;
        }

        if (distance < 0) {
            var tmpPos = {
                x: characterPos.x - 100,
                y: this.sprite.getPosition().y - this.velocity * dt
            };
            this.sprite.setPosition(tmpPos);

        } else {
            var tmpPos = {
                x: characterPos.x - 100,
                y: this.sprite.getPosition().y  + this.velocity * dt
            };
            this.sprite.setPosition(tmpPos);
        }


        //this.sprite.setPosition(cc.p(characterPos.x - 100, characterPos.y + 120));
    }
});