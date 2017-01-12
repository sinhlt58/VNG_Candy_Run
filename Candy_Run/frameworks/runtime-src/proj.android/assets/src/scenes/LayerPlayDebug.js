/**
 * Created by SinhBlack on 1/7/2017.
 */
var LayerPlayDebug = cc.Layer.extend({
    animationLayer:null,
    labelPool:null,
    debugNumFrames:0,
    drawNode:null,
    ctor:function (animationLayer) {
        this._super();
        this.animationLayer = animationLayer;

        this.labelPool= new cc.LabelTTF("Object Pool: ", "Helvetica");
        this.labelPool.setFontSize(20);
        this.labelPool.setAnchorPoint(cc.p(0, 0));
        this.labelPool.setPosition(cc.p(30, cc.view.getVisibleSize().height - 50));
        this.addChild(this.labelPool);

        this.scheduleUpdate();
    },
    update:function (dt) {
        this.debugNumFrames++;
        // if (this.debugNumFrames > 600 && dt > 0.06)
        //     cc.director.pause();
        //debug
        this.labelPool.setString(" Items: " + this.animationLayer.world.factory.objectPool.available["Item"].length +
            ", Ground: " + this.animationLayer.world.factory.objectPool.available["Ground"].length +
            ", Obstacles: " + this.animationLayer.world.factory.objectPool.available["Obstacle"].length +
            ", Inuse: " + this.animationLayer.getChildrenCount()+
            ", Num created: " + this.animationLayer.world.factory.objectPool.testCoutCreated +
            "\n, Num created Animation: " + this.animationLayer.world.factory.testNumCreatedAnimation +
            ", Num frames: " + ++this.debugNumFrames +
            ", DeltaTime: " + dt);
    }
});