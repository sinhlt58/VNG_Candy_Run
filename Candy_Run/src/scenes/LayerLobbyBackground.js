/**
 * Created by Fresher on 12/29/2016.
 */
var LayerLobbyBackground = cc.Layer.extend({


    backgroundImg: null,

    ctor:function () {
        this._super();
        this.init();
    },
    init: function () {
        this.backgroundImg= new cc.Sprite("#lobbyBg.png");
        this.addChild(this.backgroundImg);
        //cc.log("layer bg lobby created");
        var visibleSize= cc.view.getVisibleSize();
        var size = this.backgroundImg.getContentSize();
        this.backgroundImg.setAnchorPoint(cc.p(0, 0));

        this.backgroundImg.setScale(visibleSize.width/size.width, visibleSize.height/size.height);
    }
});