/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyStatus = cc.Layer.extend({
    BUTTON_PLAY:null,
    BUTTON_CHARACTERS_SHOP:null,
    BUTTON_PETS_SHOP:null,
    BUTTON_ADD_GOLD:null,
    BUTTON_ADD_G:null,
    BUTTON_ADD_HEART:null,
    ctor:function () {
        this._super();
        this.init();
        //cc.log(this['TEST_BUTTON_PAUSE']);
    },
    init:function () {
        this.BUTTON_PLAY = new ccui.Button(res.test_button);
        var visibleSize = cc.view.getVisibleSize();
        var size = this.BUTTON_PLAY.getContentSize();
        this.BUTTON_PLAY.setPosition(cc.p(visibleSize.width - size.width/2 - 30, size.height/2 + 20));
        this.addChild(this.BUTTON_PLAY);
        this.BUTTON_PLAY.addTouchEventListener(this.handleButtonEvents, this);
    },
    
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.BUTTON_PLAY){
                cc.director.pushScene(new ScenePlay());
            }else if(sender == this.BUTTON_CHARACTERS_SHOP){

            }else if(sender == this.BUTTON_PETS_SHOP){

            }
        }
    }
});