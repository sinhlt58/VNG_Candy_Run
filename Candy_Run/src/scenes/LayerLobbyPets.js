/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyPets= cc.Layer.extend({


    centerPos: null,
    background: null,

    slot_1: null,
    pet_1: null,
    information_slot_1: null,
    information_1: null,
    button_select_1: null,
    button_selected_1: null,



    slot_2: null,
    pet_2: null,
    information_slot_2: null,
    information_2: null,
    button_select_2: null,
    button_selected_2: null,


    ctor:function () {
        this._super();
        this.init();
        this.setVisible(false);
    },
    init: function () {
        this.centerPos=cc.p(this.getContentSize().width/2, this.getContentSize().height/2);

        this.background= new cc.Sprite("#BG.png");
        this.background.setPosition(this.centerPos);
        this.background.setScaleX(0.86);
        this.addChild(this.background);

        //create slot 1
        this.slot_1= new cc.Sprite("#shopYellowSlot1.png");
        var slot_1_position= cc.p(this.centerPos.x - this.slot_1.getContentSize().width/2-20, this.centerPos.y-30);
        this.slot_1.setPosition(slot_1_position);
        this.addChild(this.slot_1);

        // pet 1
        this.pet_1= new cc.Sprite(res.gui_pet_cookie);
        this.pet_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y+70));
        this.addChild(this.pet_1);


        //information slot 1
        this.information_slot_1= new cc.Sprite("#featureSlot.png");
        this.information_slot_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y-30));
        this.addChild(this.information_slot_1);

        //information 1
        this.information_1= new ccui.Text();
        this.information_1.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Decreasing HP slower",
            color: cc.color.BLACK,
        });
        this.information_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y-30));
        this.addChild(this.information_1);

        //button select 1
        this.button_select_1= new ccui.Button("selectBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.button_select_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y-120));
        this.addChild(this.button_select_1);





        //create slot 2
        this.slot_2= new cc.Sprite("#shopYellowSlot2.png");
        var slot_2_position= cc.p(this.centerPos.x + this.slot_2.getContentSize().width/2+20, this.centerPos.y-30);
        this.slot_2.setPosition(slot_2_position);
        this.addChild(this.slot_2);


        //pet 2
        this.pet_2= new cc.Sprite(res.gui_pet_zombie);
        this.pet_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y+70));
        this.addChild(this.pet_2);


        //information slot 2
        this.information_slot_2= new cc.Sprite("#featureSlot.png");
        this.information_slot_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y-30));
        this.addChild(this.information_slot_2);

        //information 2
        this.information_2= new ccui.Text();
        this.information_2.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Bonus a life",
            color: cc.color.BLACK,
        });
        this.information_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y-30));
        this.addChild(this.information_2);
        // create button select 2
        this.button_select_2= new ccui.Button("selectBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.button_select_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y-120));
        this.addChild(this.button_select_2);



    }
});