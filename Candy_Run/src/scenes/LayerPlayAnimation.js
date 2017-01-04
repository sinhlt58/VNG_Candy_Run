/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAimation = cc.Layer.extend({
    world: null,
    factoryObject: null,
    character: null,

    labelPool:null,
    debugNumFrames:0,
    ctor: function () {
        this._super();
        this.init();
        this.scheduleUpdate();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
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

        this.labelPool= new cc.LabelTTF("Object Pool: ", "Helvetica");
        this.labelPool.setFontSize(20);
        this.labelPool.setAnchorPoint(cc.p(0, 0));
        this.addChild(this.labelPool);
    },
    update:function (dt) {
        //handle inputs.

        this.character.update(dt);

        //update layer position relative to the pos of character.
        this.updateCamera(this.character);

        //update world accordingly to the character's pos.
        this.world.update(dt);

        //debug
        this.labelPool.setPosition(this.character.getPosition().x-200, this.character.getPosition().y + 400);
        this.labelPool.setString(" Items: " + this.world.factory.objectPool.available["Item"].length +
                                ", Ground: " + this.world.factory.objectPool.available["Ground"].length +
                                ", Obstacles: " + this.world.factory.objectPool.available["Obstacle"].length +
                                ", Inuse: " + this.getChildrenCount()+
                                ", Num created: " + this.world.factory.objectPool.testCoutCreated +
                                "\n, Num created Animation: " + this.world.factory.testNumCreatedAnimation +
                                ", Num frames: " + ++this.debugNumFrames);
    },
    updateCamera:function (character) {
        var visibleSize = cc.view.getVisibleSize();
        var characterPos = character.getPosition();
        var characterInitPos = character.getInitPosition();

        var changeX = characterPos.x - characterInitPos.x;
        var changeY = parseInt(characterPos.y / visibleSize.height)*visibleSize.height;
        this.setPosition(-changeX, -changeY);
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
    }
});