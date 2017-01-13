/**
 * Created by Fresher on 1/11/2017.
 */
var Pet = cc.Class.extend({
    skillId:null,
    character:null,
    sprite:null,

    ctor:function () {

    },
    update:function (dt) {
        //update pos.
        //todo: update movement later for realistic
        var characterPos = this.character.getPosition();
        this.sprite.setPosition(cc.p(characterPos.x - 100, characterPos.y + 120));
    }
});