/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyStatus = cc.Layer.extend({




    touchable: null,

    layer_select_character: null,

    layer_select_pets: null,




    SLOT_PLAY: null,

    BUTTON_PLAY: null,

    BUTTON_CHARACTERS_SELECT: null,

    BUTTON_PETS_SELECT: null,


    BUTTON_TREASURE: null,


    BUTTON_ADD_GOLD: null,
    BUTTON_ADD_G: null,
    BUTTON_ADD_HEART: null,


    SP_ANIMATION: null,


    SLOT_EXP: null,
    EXP_BAR: null,
    STAR: null,
    NUM_LEVEL: null,
    SLOT_COIN: null,
    SLOT_HEART: null,


    HEART: null,



    sp_ani_1: null,

    sp_ani_2: null,



    current_sp: null,
    /*btn_select_character: null,
     btn_select_pets*/


    ctor: function (layer_s_ch, layer_s_pet) {


        this._super();


        this.layer_select_character=layer_s_ch;
        this.layer_select_pets= layer_s_pet;

        this.touchable=true;


        this.HEART = [];
        this.init();
        //cc.log(this['TEST_BUTTON_PAUSE']);
    },
    init: function () {

        /*var allImg= cc.spriteFrameCache;
         allImg.addSpriteFrames(res.main_lobby_plist, res.main_lobby_png);*/


        var visibleSize = this.getContentSize();


        // create slot play
        this.SLOT_PLAY = new cc.Sprite("#slotplay.png");
        /*this.addChild(this.BUTTON_PLAY);
         this.BUTTON_PLAY.addTouchEventListener(this.handleButtonEvents, this);*/
        var g_width = visibleSize.width;
        var g_height = visibleSize.height;
        var slotPlayPos = cc.p(g_width - this.SLOT_PLAY.getContentSize().width / 2 - 30, this.SLOT_PLAY.getContentSize().height / 2 + 10)
        //var slotPlayPos= cc.p(0.0);
        this.SLOT_PLAY.setPosition(slotPlayPos);
        this.addChild(this.SLOT_PLAY);

        //create btn play
        this.BUTTON_PLAY = new ccui.Button("play.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.BUTTON_PLAY.setPosition(cc.p(slotPlayPos.x, slotPlayPos.y - 10));
        this.addChild(this.BUTTON_PLAY);
        this.BUTTON_PLAY.addTouchEventListener(this.handleButtonEvents, this);


        //create btn select character
        this.BUTTON_CHARACTERS_SELECT = new ccui.Button("charShopBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.BUTTON_CHARACTERS_SELECT.setPosition(cc.p(slotPlayPos.x, slotPlayPos.y + 75));
        this.addChild(this.BUTTON_CHARACTERS_SELECT);
        this.BUTTON_CHARACTERS_SELECT.addTouchEventListener(this.handleButtonEvents, this);


        //create btn select pets
        this.BUTTON_PETS_SELECT = new ccui.Button("petShopBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.BUTTON_PETS_SELECT.setPosition(cc.p(slotPlayPos.x + 100, slotPlayPos.y + 75));
        this.BUTTON_PETS_SELECT.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.BUTTON_PETS_SELECT);


        //create btn treasure
        this.BUTTON_TREASURE = new ccui.Button("treasureShopBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.BUTTON_TREASURE.setPosition(cc.p(slotPlayPos.x - 100, slotPlayPos.y + 75));
        this.addChild(this.BUTTON_TREASURE);


        //create sp animation character
        this.sp_ani_1 = new sp.SkeletonAnimation(res.zombie_json, res.zombie_atlas);
        this.sp_ani_1.setAnimation(0, "run1", true);
        this.sp_ani_1.setScale(0.7);
        this.sp_ani_1.setTimeScale(0.7);
        this.sp_ani_1.setPosition(cc.p(slotPlayPos.x, slotPlayPos.y + 120));
        this.addChild(this.sp_ani_1);



        this.sp_ani_2 = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.sp_ani_2.setAnimation(0, "run1", true);
        this.sp_ani_2.setScale(0.7);
        this.sp_ani_2.setTimeScale(0.7);
        this.sp_ani_2.setPosition(cc.p(slotPlayPos.x, slotPlayPos.y + 120));
        this.sp_ani_2.setVisible(false);
        this.addChild(this.sp_ani_2);






        //create slot exp
        this.SLOT_EXP = new cc.Sprite("#slotExp.png");
        this.SLOT_EXP.setPosition(cc.p(this.SLOT_EXP.getContentSize().width / 2 + 50, visibleSize.height - this.SLOT_EXP.getContentSize().height / 2 - 10));
        this.addChild(this.SLOT_EXP);


        //create exp bar
        this.EXP_BAR = new cc.Sprite("#exp.png");
        this.EXP_BAR.setPosition(cc.p(this.SLOT_EXP.getContentSize().width / 2 + 50, visibleSize.height - this.SLOT_EXP.getContentSize().height / 2 - 10));
        this.addChild(this.EXP_BAR);


        //create star
        this.STAR = new cc.Sprite("#star.png");
        this.STAR.setPosition(50, visibleSize.height - this.STAR.getContentSize().height / 2 - 5);
        this.addChild(this.STAR);


        //create number level
        this.NUM_LEVEL = new ccui.Text();
        this.NUM_LEVEL.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "10",

        });
        this.NUM_LEVEL.setScale(1.5);
        this.NUM_LEVEL.setPosition(50, visibleSize.height - this.STAR.getContentSize().height / 2 - 5);
        this.addChild(this.NUM_LEVEL);


        //create slot coin
        this.SLOT_COIN = new cc.Sprite("#slot.png");
        this.SLOT_COIN.setPosition(cc.p(visibleSize.width / 2, visibleSize.height - this.SLOT_COIN.getContentSize().height / 2 - 5));
        this.SLOT_COIN.setScale(0.8);
        this.addChild(this.SLOT_COIN);


        //create add coin btn
        this.BUTTON_ADD_GOLD = new ccui.Button("addBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.BUTTON_ADD_GOLD.setScale(0.8);
        this.BUTTON_ADD_GOLD.setPosition(cc.p(visibleSize.width / 2 + this.SLOT_COIN.getContentSize().width / 2 - 35, visibleSize.height - this.SLOT_COIN.getContentSize().height / 2 - 4));
        this.addChild(this.BUTTON_ADD_GOLD);


        //create slot heart
        this.SLOT_HEART = new cc.Sprite("#slot_heart.png");
        this.SLOT_HEART.setPosition(visibleSize.width - this.SLOT_HEART.getContentSize().width / 2, visibleSize.height - this.SLOT_HEART.getContentSize().height / 2 - 5);
        this.SLOT_HEART.setScale(0.8);
        this.addChild(this.SLOT_HEART);


        //create 5 heart
        var heart_1 = new cc.Sprite('#heart.png');
        heart_1.setPosition(cc.p(visibleSize.width - this.SLOT_HEART.getContentSize().width / 2 - 85, visibleSize.height - this.SLOT_HEART.getContentSize().height / 2 - 5));
        heart_1.setScale(0.8);
        this.addChild(heart_1);

        //var
    },

    handleButtonEvents: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {

            //cc.log("click on layer");

            // no layer cover this layer
            if(this.touchable==true){
                if (sender == this.BUTTON_PLAY) {
                    cc.director.pushScene(new ScenePlay());

                } else if (sender == this.BUTTON_CHARACTERS_SELECT) {
                    cc.log("Select character");
                    this.layer_select_character.setVisible(true);
                    this.touchable=false;

                } else if (sender == this.BUTTON_PETS_SELECT) {
                    cc.log("pet select");
                    this.layer_select_pets.setVisible(true);
                    this.touchable=false;
                }

            }
            //some layer is covering this layer
            else{
                // nothing here
            }

        }
    }
});