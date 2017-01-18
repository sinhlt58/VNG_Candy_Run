/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyPets= cc.Layer.extend({




    wentUp: null,
    velocity: null,
    initPos: null,
    currentPosY: null,
    wentDown: null,
    isGoingUp: null,
    isGoingDown: null,





    layerLobbyStatus: null,


    x_button: null,

    centerPos: null,
    background: null,


    title: null,


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
        this.setVisible(true);
        this.scheduleUpdate();
    },
    init: function () {




        this.wentUp=false;
        this.wentDown=true;
        this.isGoingDown=false;
        this.isGoingUp= false;
        this.velocity=1000;
        this.initPosY= - this.getContentSize().height;
        this.currentPosY= this.initPosY;

        this.setPosition(cc.p(0, this.initPosY));





        this.centerPos=cc.p(this.getContentSize().width/2, this.getContentSize().height/2);


        // create background
        this.background= new cc.Sprite("#BG.png");
        this.background.setPosition(this.centerPos);
        this.background.setScaleX(0.86);
        this.addChild(this.background);


        // create x_button

        this.x_button= new ccui.Button(res.gui_x_button, "", "", ccui.Widget.LOCAL_TEXTURE);
        this.x_button.setScale(0.5);
        this.x_button.setPosition(cc.p(this.centerPos.x + this.background.getContentSize().width / 2 - 70,
            this.centerPos.y + this.background.getContentSize().height / 2 - 15));
        this.addChild(this.x_button);

        this.x_button.addTouchEventListener(this.handleButtonEvents, this);





        // create title
        this.title= new ccui.Text();

        this.title.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            font: "Helvetica",
            string: "Select a pet",
            color: cc.color.BLACK
        });
        this.title.setPosition(cc.p(this.centerPos.x, this.centerPos.y +170));
        this.addChild(this.title);

        //create slot 1
        this.slot_1= new cc.Sprite("#shopYellowSlot1.png");
        var slot_1_position= cc.p(this.centerPos.x - this.slot_1.getContentSize().width/2-20, this.centerPos.y-30);
        this.slot_1.setPosition(slot_1_position);
        this.addChild(this.slot_1);

        // pet star
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
        this.button_select_1.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.button_select_1);

        // create btn selected 1
        this.button_selected_1= new cc.Sprite("#selectedBtn.png");
        this.button_selected_1.setPosition(cc.p(slot_1_position.x, slot_1_position.y-120));
        this.addChild(this.button_selected_1);
        this.button_selected_1.setVisible(false);





        //create slot 2
        this.slot_2= new cc.Sprite("#shopYellowSlot2.png");
        var slot_2_position= cc.p(this.centerPos.x + this.slot_2.getContentSize().width/2+20, this.centerPos.y-30);
        this.slot_2.setPosition(slot_2_position);
        this.addChild(this.slot_2);


        //pet 2 , eye pet
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
        this.button_select_2.setVisible(false);
        this.button_select_2.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.button_select_2);



        this.button_selected_2= new cc.Sprite("#selectedBtn.png");
        this.button_selected_2.setPosition(cc.p(slot_2_position.x, slot_2_position.y-120));
        this.addChild(this.button_selected_2);


        if(cr.game.getPlayer().currentPetId==0){ // eye pet, selected pet 2
            this.button_selected_2.setVisible(true);
            this.button_select_2.setVisible(false);
            this.button_select_1.setVisible(true);
            this.button_selected_1.setVisible(false);
        }else{
            this.button_selected_2.setVisible(false);
            this.button_select_2.setVisible(true);
            this.button_select_1.setVisible(false);
            this.button_selected_1.setVisible(true);
        }


    },
    
    update: function (dt) {
        // handle going up
        if(this.isGoingUp==true){
            this.currentPosY+=this.velocity*dt;
            // went up
            if(this.currentPosY>=0){
                this.currentPosY=0;
                this.isGoingUp=false;
                this.wentUp=true;
            }

            this.setPosition(cc.p(0, this.currentPosY));
        }


        // handle going down



        if(this.isGoingDown==true){
            this.currentPosY-=this.velocity*dt;

            //went down
            if(this.currentPosY<=this.initPosY){
                this.currentPosY= this.initPosY;
                this.isGoingDown= false;
                this.wentDown=true;
            }
            this.setPosition(cc.p(0, this.currentPosY));
        }






        // reset touchable
        if(this.wentDown==true){
            this.layerLobbyStatus.touchable=true;
        }
    },


    handleButtonEvents: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {

            if(sender== this.button_select_1){
                this.button_selected_1.setVisible(true);
                this.button_select_1.setVisible(false);
                this.button_select_2.setVisible(true);
                this.button_selected_2.setVisible(false);
                cc.log("select pet 1");
                cr.game.getPlayer().currentPetId=1;

            }else if(sender== this.button_select_2){
                cc.log("select pet 2");
                this.button_selected_1.setVisible(false);
                this.button_select_1.setVisible(true);
                this.button_select_2.setVisible(false);
                this.button_selected_2.setVisible(true);
                cr.game.getPlayer().currentPetId=0;
            }else if(sender== this.x_button){
                cc.log("X clicked");


                if(this.wentUp==true){
                    this.isGoingDown=true;
                    this.isGoingUp=false;
                    this.wentDown=false;
                    //this.layerLobbyStatus.touchable=true;
                }
            }


        }
    }
});