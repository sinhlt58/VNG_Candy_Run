/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyCharacters = cc.Layer.extend({


    layerLobbyStatus: null,


    positionDialog: null,


    background: null,


    x_button: null,

    btn_normal: null,
    btn_selected: null,

    slot_char_1: null,
    circle_slot_1: null,
    sp_cha_1: null,
    information_char1_slot: null,
    text_info_char_1: null,
    btn_select_char_1: null,
    btn_selected_char_1: null,


    slot_char_2: null,
    circle_slot_2: null,
    sp_cha_2: null,
    information_char2_slot: null,
    text_info_char_2: null,
    btn_select_char_2: null,
    btn_selected_char_2: null,


    title: null,


    centerPos: null,

    ctor: function () {
        this._super();
        this.init();
        this.setVisible(false);
        this.scheduleUpdate();
    },
    init: function () {
        this.centerPos = cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2);


        //create background
        this.background = new cc.Sprite("#BG.png");
        this.background.setPosition(this.centerPos);
        this.background.setScaleX(0.86);
        this.addChild(this.background);


        //create x button
        this.x_button = new ccui.Button(res.gui_x_button, "", "", ccui.Widget.LOCAL_TEXTURE);
        this.x_button.setScale(0.5);
        this.x_button.setPosition(cc.p(this.centerPos.x + this.background.getContentSize().width / 2 - 70,
            this.centerPos.y + this.background.getContentSize().height / 2 - 15));


        // create title
        this.title = new ccui.Text();
        this.title.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Select a character",
            color: cc.color.BLACK
        });

        this.title.setPosition(cc.p(this.centerPos.x, this.centerPos.y + 170));
        this.addChild(this.title);


        //only create 2 slot for character
        // slot 1
        this.slot_char_1 = new cc.Sprite("#shopYellowSlot1.png");
        var slot_1_position = cc.p(this.centerPos.x - this.slot_char_1.getContentSize().width / 2 - 20, this.centerPos.y - 30);
        this.slot_char_1.setPosition(slot_1_position);
        this.addChild(this.slot_char_1);

        //create circle slot 1
        this.circle_slot_1 = new cc.Sprite("#circle.png");
        this.circle_slot_1.setPosition(slot_1_position);
        this.addChild(this.circle_slot_1);


        //create spAni character 1
        this.sp_cha_1 = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.sp_cha_1.setPosition(slot_1_position);
        this.sp_cha_1.setAnimation(0, 'run1', true);
        this.sp_cha_1.setTimeScale(0.6);
        this.addChild(this.sp_cha_1);

        //create information char 1 slot
        this.information_char1_slot = new cc.Sprite("#featureSlot.png");
        this.information_char1_slot.setPosition(cc.p(slot_1_position.x, slot_1_position.y - 70));
        this.addChild(this.information_char1_slot);


        //text information char 1
        this.text_info_char_1 = new ccui.Text();
        this.text_info_char_1.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Attract items",
            color: cc.color.BLACK
        });
        this.text_info_char_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y - 70));
        this.addChild(this.text_info_char_1);


        //button select char 1

        this.btn_select_char_1 = new ccui.Button("selectBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.btn_select_char_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y - 120));
        this.btn_select_char_1.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.btn_select_char_1);


        //button selected char 1
        this.btn_selected_char_1 = new ccui.Button("selectedBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.btn_selected_char_1.setPosition(cc.p(slot_1_position.x + 10, slot_1_position.y - 120));
        this.addChild(this.btn_selected_char_1);
        this.btn_selected_char_1.setVisible(false);


        /*this.NUM_LEVEL = new ccui.Text();
         this.NUM_LEVEL.attr({
         textAlign: cc.TEXT_ALIGNMENT_CENTER,
         font: "Helvetica",
         string: "10",

         });*/


        //slot 2
        this.slot_char_2 = new cc.Sprite("#shopYellowSlot2.png");
        var slot_2_position = cc.p(this.centerPos.x + this.slot_char_2.getContentSize().width / 2 + 20, this.centerPos.y - 30);
        this.slot_char_2.setPosition(slot_2_position);
        this.addChild(this.slot_char_2);

        //create circle slot 2
        this.circle_slot_2 = new cc.Sprite("#circle.png");
        this.circle_slot_2.setPosition(slot_2_position);
        this.addChild(this.circle_slot_2);


        //create sp ani cha 2
        this.sp_cha_2 = new sp.SkeletonAnimation(res.zombie_json, res.zombie_atlas);
        this.sp_cha_2.setPosition(slot_2_position);
        this.sp_cha_2.setAnimation(0, 'run1', true);
        this.sp_cha_2.setTimeScale(0.6);
        this.addChild(this.sp_cha_2);

        // create information char 2
        this.information_char2_slot = new cc.Sprite("#featureSlot.png");
        this.information_char2_slot.setPosition(cc.p(slot_2_position.x, slot_2_position.y - 70));
        this.addChild(this.information_char2_slot);


        //text information char 2
        this.text_info_char_2 = new ccui.Text();
        this.text_info_char_2.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Bonus a life",
            color: cc.color.BLACK
        });
        this.text_info_char_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y - 70));
        this.addChild(this.text_info_char_2);


        //button select char 2
        this.btn_select_char_2 = new ccui.Button("selectBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.btn_select_char_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y - 120));
        this.addChild(this.btn_select_char_2);
        this.btn_select_char_2.addTouchEventListener(this.handleButtonEvents, this);
        this.btn_select_char_2.setVisible(false);

        //button selected char 2
        this.btn_selected_char_2 = new ccui.Button("selectedBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.btn_selected_char_2.setPosition(cc.p(slot_2_position.x + 10, slot_2_position.y - 120));
        this.addChild(this.btn_selected_char_2);
        this.btn_selected_char_2.setVisible(true);


        this.addChild(this.x_button);
        this.x_button.addTouchEventListener(this.handleButtonEvents, this);

    },

    update: function (dt) {

    },
    handleButtonEvents: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {

            if (sender == this.btn_select_char_1) {
                cc.log("char 1 selected, princess");
                this.btn_selected_char_1.setVisible(true);
                this.btn_select_char_1.setVisible(false);
                this.btn_select_char_2.setVisible(true);
                this.btn_selected_char_2.setVisible(false);
                // todo: change parameter of game here

                cr.game.getPlayer().currentCharacterId= 1;
                this.layerLobbyStatus.sp_ani_2.setVisible(true);
                this.layerLobbyStatus.sp_ani_1.setVisible(false);

            } else if (sender == this.btn_select_char_2) {
                this.btn_select_char_1.setVisible(true);
                this.btn_selected_char_1.setVisible(false);
                this.btn_selected_char_2.setVisible(true);
                this.btn_select_char_2.setVisible(false);

                // todo: change parameter of game here
                cr.game.getPlayer().currentCharacterId= 0;

                this.layerLobbyStatus.sp_ani_1.setVisible(true);
                this.layerLobbyStatus.sp_ani_2.setVisible(false);

            } else if (sender == this.x_button) {
                cc.log("X clicked");
                this.setVisible(false);
                this.layerLobbyStatus.touchable=true;
            }

        }
    }

});