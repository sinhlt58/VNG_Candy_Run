/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayStatus = cc.Layer.extend({
    buttonPause: null,
    TEST_BUTTON_DIE: null,
    isGamePause: false,
    animationLayer: null,
    labelScore: 0,
    labelMoney: 0,
    globalPadding: 10,

    buttonJump: null,
    buttonSlide: null,

    bonusTimeGui: null,

    hpProcessBar:null,

    layerPlayEnd:null,


    playerSliding: null,

    ctor: function (animationLayer) {
        this._super();
        this.animationLayer = animationLayer;
        this.init();

        this.scheduleUpdate();

        this.playerSliding = false;
    },
    init: function () {

        //todo: remove later
        this.buttonPause = new ccui.Button("pauseBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        var visibleSize = cc.view.getVisibleSize();
        var size = this.buttonPause.getContentSize();
        this.buttonPause.setPosition(cc.p(visibleSize.width - size.width / 2 - this.globalPadding, visibleSize.height - size.height / 2 - this.globalPadding));
        this.addChild(this.buttonPause);
        this.buttonPause.addTouchEventListener(this.handleButtonEvents, this);

        //todo: remove later
        this.TEST_BUTTON_DIE = new ccui.Button("pauseBtn.png", "", "", ccui.Widget.PLIST_TEXTURE);
        visibleSize = cc.view.getVisibleSize();
        size = this.TEST_BUTTON_DIE.getContentSize();
        this.TEST_BUTTON_DIE.setPosition(cc.p(visibleSize.width - size.width * 1.5 - 20,
            visibleSize.height - size.height / 2 - this.globalPadding));
        this.addChild(this.TEST_BUTTON_DIE);
        this.TEST_BUTTON_DIE.addTouchEventListener(this.handleButtonEvents, this);

        //init score label
        this.labelScore = new cc.LabelTTF("", "Helvetica");
        size = this.labelScore.getContentSize();
        this.labelScore.setFontSize(35);
        this.labelScore.setPosition(visibleSize.width / 2, visibleSize.height - size.height / 2 - 0.04*visibleSize.height);
        this.labelScore.setColor(cc.color(255, 255, 255));
        this.addChild(this.labelScore);

        var scoreIcon = new cc.Sprite("#G.png");
        size = scoreIcon.getContentSize();
        scoreIcon.setPosition(this.labelScore.getPosition().x - 70 , this.labelScore.getPosition().y);
        this.addChild(scoreIcon);

        this.labelMoney = new cc.LabelTTF("", "Helvetica");
        size = this.labelMoney.getContentSize();
        this.labelMoney.setFontSize(35);
        this.labelMoney.setColor(cc.color(255, 255, 255));
        this.labelMoney.setPosition(visibleSize.width / 2 + 200, visibleSize.height - size.height / 2 -  0.04*visibleSize.height);
        this.addChild(this.labelMoney);

        var moneyScore = new cc.Sprite("#gold.png");
        size = moneyScore.getContentSize();
        moneyScore.setPosition(this.labelMoney.getPosition().x - 90, this.labelMoney.getPosition().y);
        this.addChild(moneyScore);

        //init play buttons
        this.buttonJump = new ccui.Button("jumpBtn_Normal.png", "jumpBtn_Selected.png", "", ccui.Widget.PLIST_TEXTURE);
        size = this.buttonJump.getContentSize();
        this.buttonJump.setPosition(size.width / 2 + 10, size.height / 2 + this.globalPadding);
        this.buttonJump.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.buttonJump);

        this.buttonSlide = new ccui.Button("slideBtn_Normal.png", "slideBtn_Selected.png", "", ccui.Widget.PLIST_TEXTURE);
        size = this.buttonSlide.getContentSize();
        this.buttonSlide.setPosition(visibleSize.width - size.width / 2 - this.globalPadding, size.height / 2 + this.globalPadding);
        this.buttonSlide.addTouchEventListener(this.handleButtonEvents, this);
        this.addChild(this.buttonSlide);

        //HP process bar
        var hpBackground = new cc.Sprite("#hpProgressBarBg.png");
        size = hpBackground.getContentSize();
        hpBackground.setPosition(visibleSize.width*0.01, visibleSize.height - 82);
        hpBackground.setAnchorPoint(cc.p(0,0));
        this.addChild(hpBackground);

        this.hpProcessBar = new cc.Sprite("#hpProgressBar.png");
        size = this.hpProcessBar.getContentSize();
        this.hpProcessBar.setPosition(visibleSize.width*0.01 + 2, visibleSize.height - 82 + 2);
        this.hpProcessBar.setAnchorPoint(cc.p(0,0));
        this.addChild(this.hpProcessBar);

        //BONUSTIME GUI
        this.bonusTimeGui = new BonusTimeGui(0.02*visibleSize.height, this.hpProcessBar.getPosition().x, this);


        //crete layer end game
        this.layerPlayEnd = new LayerPlayEnd(cc.loader.getRes(res.gui_end_game_json));
        this.addChild(this.layerPlayEnd);
        this.layerPlayEnd.setVisible(false);
    },

    update:function (dt) {
        if(this.animationLayer.character.isDead()){
            this.animationLayer.character.stateMachine.changeState("stateMovement", new StateDie());
            // this.animationLayer.pause();

            // this.layerPlayEnd.setMoney(cr.game.getPlayer().currentMoney);
            // this.layerPlayEnd.setScore(cr.game.getPlayer().currentScore);
            // this.layerPlayEnd.setVisible(true);
        }

        this.bonusTimeGui.update();
        var itemEffectLetter = cr.item_effect_manager.getItemEffectByType(globals.ITEM_EFFECT_LETTER);
        if (itemEffectLetter.isFullString()){
            this.animationLayer.world.setTriggerHeaven(true);
            itemEffectLetter.resetLetters();
            this.animationLayer.world.character.stateMachine.changeState("stateMovement", new StateInHeaven());
        }

        this.labelScore.setString(cr.game.getPlayer().currentScore);
        this.labelMoney.setString(cr.game.getPlayer().currentMoney);
        //update hp process bar.
        var ratioHP = parseFloat(this.animationLayer.character.getHP()/ this.animationLayer.character.getMaxHP());
        if (ratioHP <= 0)
            ratioHP = 0;
        this.hpProcessBar.setScaleX(ratioHP);


        if(this.animationLayer.character.stateMachine.stateMovement instanceof StateSliding){
            // no change
        }
        else if(this.animationLayer.character.stateMachine.stateMovement instanceof StateRunning && this.playerSliding){
            this.animationLayer.character.stateMachine.changeState('stateMovement', new StateSliding());
        }
    },
    handleButtonEvents: function (sender, type) {

        if (type == ccui.Widget.TOUCH_BEGAN) {
            if (sender == this.buttonJump) {

                var character = this.animationLayer.character;



                // flying
                if (this.animationLayer.character.stateMachine.stateMovement instanceof StateFlying) {
                    var crState = this.animationLayer.character.stateMachine.stateMovement;

                    if (crState.timePass >= crState.time == false&&( character.getPosition().y+ character.getContentSize().height<= cc.view.getVisibleSize().height)) {
                        character.setVelocityY(200);
                    } else {
                        // do nothing here
                    }


                }
                // in heaven
                else if (this.animationLayer.character.stateMachine.stateMovement instanceof StateInHeaven) {
                    // handle in heaven
                    var stateInHeaven = this.animationLayer.character.stateMachine.stateMovement;
                    if (stateInHeaven.passedTime <= stateInHeaven.time) {
                        character.setVelocityY(300);
                    }

                }


            }
            if (sender == this.buttonSlide) {
                //character slide

                this.playerSliding = true;


                /*var character = this.animationLayer.character;

                //only can slide when running
                if (character.stateMachine.stateMovement instanceof StateRunning == true) {
                    character.stateMachine.changeState('stateMovement', new StateSliding());
                    cc.log("Enter sliding");
                } else {
                    cc.log('Sliding');
                }*/
            }
        }

        if (type == ccui.Widget.TOUCH_ENDED) {
            if (sender == this.buttonPause) {
                this.isGamePause = !this.isGamePause;
                if (this.isGamePause) {
                    cc.director.pause();
                } else {
                    cc.director.resume();
                }
            }
            if (sender == this.TEST_BUTTON_DIE) {
                cc.director.popScene();
            }

            if (sender == this.buttonJump) {


                var character = this.animationLayer.character;


                if (character.stateMachine.stateMovement instanceof StateRunning) {
                    character.stateMachine.changeState("stateMovement", new StateJumping(character));

                }
                // is jumping v1
                else if (character.stateMachine.stateMovement instanceof StateJumping) {
                    character.stateMachine.changeState('stateMovement', new StateDoubleJumping(character));
                }
                // is Flying
                else if (character.stateMachine.stateMovement instanceof StateFlying) {
                    //character.setVelocityY(-200);
                }
                // is inHeaven
                else if (character.stateMachine.stateMovement instanceof StateInHeaven) {
                    //character.setVelocityY(-300);
                }


            }
            if (sender == this.buttonSlide) {
                //character end slide


                this.playerSliding=false;
                var character = this.animationLayer.character;
                if (character.stateMachine.stateMovement instanceof StateSliding) {
                    character.stateMachine.changeState('stateMovement', new StateRunning(character));
                }
                //cc.log("Space is released");
                //cc.log("Exit sliding");
            }
        }


    }
});