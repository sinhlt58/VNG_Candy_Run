/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyCharacters= cc.Layer.extend({

    positionDialog: null,


    background:null,


    btn_normal: null,
    btn_selected: null,

    slot_char_1: null,
    slot_char_2: null,





    centerPos: null,

    ctor:function () {
        this._super();
        this.init();
    },
    init: function () {
        this.centerPos= cc.p(this.getContentSize().width/2, this.getContentSize().height/2);
        cc.spriteFrameCache.addSpriteFrames(res.character_lobby_plist, res.character_lobby_png);


        //create background
        this.background= new cc.Sprite("#BG.png");
        this.background.setPosition(this.centerPos);
        this.background.setScaleX(0.86);
        this.addChild(this.background);



        //only create 2 slot for character
        // slot 1
        this.slot_char_1= new cc.Sprite("#shopYellowSlot1.png");
        var slot_1_position= cc.p(this.centerPos.x - this.slot_char_1.getContentSize().width/2-20, this.centerPos.y-30);
        this.slot_char_1.setPosition(slot_1_position);
        this.addChild(this.slot_char_1);


        //slot 2

        this.slot_char_2= new cc.Sprite("#shopYellowSlot2.png");
        var slot_2_position= cc.p(this.centerPos.x + this.slot_char_2.getContentSize().width/2+20, this.centerPos.y-30);
        this.slot_char_2.setPosition(slot_2_position);
        this.addChild(this.slot_char_2);


    }
});