/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAnimation = cc.Layer.extend({
    world: null,
    factoryObject: null,
    character: null,
    //testSprite:null,
    ctor: function () {
        this._super();
        this.init();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.scheduleUpdate();
    },
    init: function () {
        //add resource to frameCache
        cc.spriteFrameCache.addSpriteFrames(res.ground_plist, res.ground_png);
        cc.spriteFrameCache.addSpriteFrames(res.obstacles_plist, res.obstacles_png);
        cc.spriteFrameCache.addSpriteFrames(res.jelly_and_items_plist, res.jelly_and_items_png);

        //create object factory with data.
        this.factoryObject = new FactoryObject(cc.loader.getRes(res.class_types),
            cc.loader.getRes(res.item_effect_types), cc.loader.getRes(res.object_types));

        //create Character
        this.character= new Character();
        this.addChild(this.character.spAnimation);

        //create world with chunk data for world object.
        this.world = new World(cc.loader.getRes(res.chunks_json), this.factoryObject, this,
            this.character);
    },
    update:function (dt) {
        //handle inputs.

        this.character.update(dt);
        //this.testSprite.setPosition(this.character.getPosition());
        //update layer position relative to the pos of character.
        this.updateCamera(this.character);

        //update world accordingly to the character's pos.
        this.world.update(dt);
    },
    updateCamera:function (character) {//todo: change code later for pretty
        var visibleSize = cc.view.getVisibleSize();
        var characterPos = character.getPosition();
        var characterInitPos = character.getInitPosition();

        var changeX = characterPos.x - characterInitPos.x;
        var changeY = parseInt((characterPos.y/this.getCameraNeedToChangeY()))*this.getCameraNeedToChangeY();

        this.setPosition(-changeX, -changeY);
    },

    getCurrentCameraY:function () {
        return Math.abs(this.getPosition().y) + cc.view.getVisibleSize().height/2;
    },

    getCameraNeedToChangeY:function(){
        return 2*this.world.getChunkHeight() - cc.view.getVisibleSize().height;
    },

    onTouchBegan: function (touch, event) {
        console.log('mouse down');
        return true;
    },
    onTouchEnded: function (t, e) {
        console.log("mouse released");
        //this.

        var thisLayer= e.getCurrentTarget();

        //console.log(thisLayer);

        thisLayer.character.stateMachine.setStateMovement(new StateJumping(thisLayer.character));

        return true;
    },
    onExit:function () {
        this._super();
        this.world.releaseAllCurrentRenderedObjects();
    }
});