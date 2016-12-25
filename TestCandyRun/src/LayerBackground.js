/**
 * Created by SinhBlack on 12/25/2016.
 */
var LayerBackground = cc.Layer.extend({
    space:null,
    sprite:null,
    count:0,
    testObstacle:null,
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.ground_plist, res.ground_png);
        cc.spriteFrameCache.addSpriteFrames(res.obstacles_plist, res.obstacles_png);

        this.initPhysics();
        this.init();
        this.scheduleUpdate();
    },
    init:function () {
        this.sprite = new cc.PhysicsSprite("#m6_trap_0_1_0.png");
        var contentSize = this.sprite.getContentSize();
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        var shape = new cp.BoxShape(body, contentSize.width, contentSize.height);
        this.space.addBody(body);
        this.space.addShape(shape);
        this.sprite.setBody(body);
        this.sprite.setPosition(cc.p(contentSize.width/2 + 120, contentSize.height/2 + 200));
        this.space.removeShape(shape);
        var newShape = new cp.BoxShape(body, contentSize.width, contentSize.height);
        this.space.addShape(newShape);
        this.testObstacle = new Obstacle(this, this.space, "#m6_trap_0_1_0.png");
        this.testObstacle.sprite.setPosition(cc.p(400, 400));
        this.testObstacle.changeByTexture("m5_trap_0_2_1.png");


        this._debugNode = new cc.PhysicsDebugNode(this.space);

        this.addChild(this._debugNode, 0);
        this.addChild(this.sprite);

        /*Init events*/
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    initPhysics:function () {
        this.space = new cp.Space();
    },
    update:function (dt) {
        this.space.step(dt);
        this.count++;
        var frame;
        if(this.count%60 === 0 ){
            //console.log("hey");
            frame = cc.spriteFrameCache.getSpriteFrame("m5_trap_0_2_1.png");
           // this.testObstacle.changeByTexture("m5_trap_0_2_1.png");
            this.sprite.setSpriteFrame(frame);
        }else{
            frame = cc.spriteFrameCache.getSpriteFrame("m6_trap_0_1_0.png");
            this.sprite.setSpriteFrame(frame);
            //this.testObstacle.changeByTexture("m6_trap_0_1_0.png");
            //console.log("hey2");
        }
    },
    onTouchBegan:function(touch, event){
        console.log(this.testObstacle);
        event.getCurrentTarget().testObstacle.removeFromParent();
        return true;
    },
    onTouchMoved:function(touch, event){

    },
    onTouchEnded:function (touch, event) {
        console.log(event.getCurrentTarget().testObstacle.sprite);
    }
});