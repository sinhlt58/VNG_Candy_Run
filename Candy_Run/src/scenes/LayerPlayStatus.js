/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayStatus= cc.Layer.extend({
    TEST_BUTTON_PAUSE:null,
    TEST_BUTTON_DIE:null,
    isGamePause:false,
    animationLayer:null,
    labelScore:0,
    labelMoney:0,
    globalPadding: 10,

    buttonJump:null,
    buttonSlide:null,

    bonusTimeGui:null,

    hpProcessBar:null,
    ctor:function (animationLayer) {
        this._super();
        this.animationLayer = animationLayer;
        this.init();

        this.scheduleUpdate();
    },
    init:function () {

        //todo: remove later
        this.TEST_BUTTON_PAUSE = new ccui.Button("pauseBtn.png", "", "",  ccui.Widget.PLIST_TEXTURE);
        var visibleSize = cc.view.getVisibleSize();
        var size = this.TEST_BUTTON_PAUSE.getContentSize();
        this.TEST_BUTTON_PAUSE.setPosition(cc.p(visibleSize.width - size.width/2 - this.globalPadding, visibleSize.height - size.height/2 - this.globalPadding));
        this.addChild(this.TEST_BUTTON_PAUSE);
        this.TEST_BUTTON_PAUSE.addTouchEventListener(this.handleButtonEvents, this);

        //todo: remove later
        this.TEST_BUTTON_DIE = new ccui.Button("pauseBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        visibleSize = cc.view.getVisibleSize();
        size = this.TEST_BUTTON_DIE.getContentSize();
        this.TEST_BUTTON_DIE.setPosition(cc.p(visibleSize.width - size.width*1.5 - 20,
            visibleSize.height - size.height/2 - this.globalPadding));
        this.addChild(this.TEST_BUTTON_DIE);
        this.TEST_BUTTON_DIE.addTouchEventListener(this.handleButtonEvents, this);

        //init score label
        this.labelScore = new cc.LabelTTF("", "Helvetica");
        size = this.labelScore.getContentSize();
        this.labelScore.setFontSize(35);
        this.labelScore.setPosition(visibleSize.width/2, visibleSize.height - size.height/2 - this.globalPadding);
        this.labelScore.setColor(cc.color(255,255,255));
        this.addChild(this.labelScore);

        this.labelMoney = new cc.LabelTTF("", "Helvetica");
        size = this.labelMoney.getContentSize();
        this.labelMoney.setFontSize(35);
        this.labelMoney.setColor(cc.color(255,255,255));
        this.labelMoney.setPosition(visibleSize.width/2 + size.width + 100, visibleSize.height - size.height/2 - this.globalPadding);
        this.addChild(this.labelMoney);

        //init play buttons
        this.buttonJump = new ccui.Button("jumpBtn_Normal.png", "jumpBtn_Selected.png", "", ccui.Widget.PLIST_TEXTURE);
        size = this.buttonJump.getContentSize();
        this.buttonJump.setPosition(size.width/2 + 10, size.height/2 + this.globalPadding);
        this.buttonJump.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.buttonJump);

        this.buttonSlide = new ccui.Button("slideBtn_Normal.png", "slideBtn_Selected.png", "", ccui.Widget.PLIST_TEXTURE);
        size = this.buttonSlide.getContentSize();
        this.buttonSlide.setPosition(visibleSize.width - size.width/2 - this.globalPadding, size.height/2 + this.globalPadding);
        this.buttonSlide.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.buttonSlide);

        //BONUSTIME GUI
        this.bonusTimeGui = new BonusTimeGui(this.globalPadding, 100, this);

        //HP process bar
        this.hpProcessBar = new cc.Sprite("hpProgressBar.png");
        this.addChild(this.hpProcessBar);
    },
    update:function (dt) {
        this.bonusTimeGui.update();
       this.labelScore.setString(cr.game.getPlayer().currentScore);
       this.labelMoney.setString(cr.game.getPlayer().currentMoney);
    },
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN){
            if (sender == this.buttonJump){

                var character= this.animationLayer.character;
                if(this.animationLayer.character.stateMachine.stateMovement instanceof StateFlying){
                    //todo set velocityY>0 and accelerationY =0
                    character.setVelocityY(200);
                    cc.log('jump hold');


                }




            }
            if (sender == this.buttonSlide){
                //character slide

                var character = this.animationLayer.character;

                //only can slide when running
                if ( character.stateMachine.stateMovement instanceof StateRunning == true) {
                    character.stateMachine.changeState('stateMovement',new StateSliding(character));
                    cc.log("Enter sliding");
                } else {
                    cc.log('Sliding');
                }
            }
        }

        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.TEST_BUTTON_PAUSE){
                this.isGamePause = !this.isGamePause;
                if(this.isGamePause){
                    cc.director.pause();
                }else{
                    cc.director.resume();
                }
            }
            if(sender == this.TEST_BUTTON_DIE){
                cc.director.popScene();
            }

            if (sender == this.buttonJump){


                var character= this.animationLayer.character;




                if (character.stateMachine.stateMovement instanceof StateRunning) {
                    character.stateMachine.changeState("stateMovement",new StateJumping(character));

                }
                // is jumping v1
                else if (character.stateMachine.stateMovement instanceof StateJumping) {
                    character.stateMachine.changeState('stateMovement',new StateDoubleJumping(character));
                }
                // is Flying
                else if(character.stateMachine.stateMovement instanceof StateFlying) {
                    character.setVelocityY(-200);
                }


            }
            if (sender == this.buttonSlide){
                //character end slide

                var character = this.animationLayer.character;
                if(character.stateMachine.stateMovement instanceof StateSliding){
                    character.stateMachine.changeState('stateMovement',new StateRunning(character));
                }
                //cc.log("Space is released");
                //cc.log("Exit sliding");
            }
        }


    }
});