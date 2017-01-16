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
        var visibleSize= this.getContentSize();

        this.backgroundImg.setScale(1.2, 1.2);

        this.backgroundImg.setPosition(cc.p(visibleSize.width/2, visibleSize.height/2));
    }
});