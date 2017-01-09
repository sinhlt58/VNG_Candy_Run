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

    ctor:function (animationLayer) {
        this._super();
        this.animationLayer = animationLayer;
        this.init();

        this.scheduleUpdate();
    },
    init:function () {
        //todo: remove later
        this.TEST_BUTTON_PAUSE = new ccui.Button(res.pause_button);
        var visibleSize = cc.view.getVisibleSize();
        var size = this.TEST_BUTTON_PAUSE.getContentSize();
        this.TEST_BUTTON_PAUSE.setPosition(cc.p(visibleSize.width - size.width/2 - 10, visibleSize.height - size.height/2 - 5));
        this.addChild(this.TEST_BUTTON_PAUSE);
        this.TEST_BUTTON_PAUSE.addTouchEventListener(this.handleButtonEvents, this);

        //todo: remove later
        this.TEST_BUTTON_DIE = new ccui.Button(res.pause_button);
        visibleSize = cc.view.getVisibleSize();
        size = this.TEST_BUTTON_DIE.getContentSize();
        this.TEST_BUTTON_DIE.setPosition(cc.p(visibleSize.width - size.width*1.5 - 20,
            visibleSize.height - size.height/2 - 5));
        this.addChild(this.TEST_BUTTON_DIE);
        this.TEST_BUTTON_DIE.addTouchEventListener(this.handleButtonEvents, this);

        //init score label
        this.labelScore = new cc.LabelTTF("", "Helvetica");
        size = this.labelScore.getContentSize();
        this.labelScore.setFontSize(35);
        this.labelScore.setPosition(visibleSize.width/2, visibleSize.height - size.height/2 - 20);
        this.labelScore.setColor(cc.color(255,255,255));
        this.addChild(this.labelScore);

        this.labelMoney = new cc.LabelTTF("", "Helvetica");
        size = this.labelMoney.getContentSize();
        this.labelMoney.setFontSize(35);
        this.labelMoney.setColor(cc.color(255,255,255));
        this.labelMoney.setPosition(visibleSize.width/2 + size.width + 100, visibleSize.height - size.height/2 - 20);
        this.addChild(this.labelMoney);

        //init money label

    },
    update:function (dt) {
       this.labelScore.setString(cr.game.getPlayer().currentScore);
       this.labelMoney.setString(cr.game.getPlayer().currentMoney);
    },
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.TEST_BUTTON_PAUSE){
                this.isGamePause = !this.isGamePause;
                if(this.isGamePause){
                    cc.director.pause();
                }else{
                    cc.director.resume();
                }
            }else if(sender == this.TEST_BUTTON_DIE){
                cc.director.popScene();
            }
        }
    }
});