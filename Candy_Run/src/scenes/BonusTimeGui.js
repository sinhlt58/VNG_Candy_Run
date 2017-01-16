/**
 * Created by Fresher on 1/10/2017.
 */
var BonusTimeGui = cc.Class.extend({
    lettersStatus:{},
    lettersBackground:null,
    ctor:function (paddingTop, initPositionX, parent) {
        var visibleSize = cc.view.getVisibleSize();

        this.lettersBackground = new cc.Sprite("#bonustimeSlot.png");
        var size =  this.lettersBackground.getContentSize();
        this.lettersBackground.setAnchorPoint(cc.p(0,0));
        this.lettersBackground.setPosition(initPositionX, visibleSize.height - size.height - paddingTop);
        parent.addChild(this.lettersBackground);

        var string = "BONUSTIME";
        var trivialX = 1.5;
        for (var i=0; i<string.length; i++){
            var letter = string.charAt(i);
            this.lettersStatus[letter] = new cc.Sprite("#" + letter + ".png");
            this.lettersStatus[letter].setAnchorPoint(cc.p(0, 0));
            var letterSize = this.lettersStatus[letter].getContentSize();
            this.lettersStatus[letter].setPosition(initPositionX - trivialX*i, this.lettersBackground.getPosition().y + 4);
            initPositionX += letterSize.width;
            this.lettersStatus[letter].setVisible(false);
            parent.addChild(this.lettersStatus[letter]);
        }
    },
    update:function () {
        for (var letter in this.lettersStatus){
            if (this.lettersStatus.hasOwnProperty(letter)){
                var spriteLetter = this.lettersStatus[letter];
                var itemEffectLetter = cr.item_effect_manager.getItemEffectByType(globals.ITEM_EFFECT_LETTER);
                spriteLetter.setVisible(itemEffectLetter.getCountByLetter(letter) > 0);
            }
        }
    }
});