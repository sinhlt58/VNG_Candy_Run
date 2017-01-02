/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAimation = cc.Layer.extend({
    world:null,
    factoryObject:null,
    tmpCharacter:null,//todo: remove later
    initCharacterPos:null,//todo: remove later
    ctor:function () {
        this._super();
        this.init();
        this.scheduleUpdate();
    },
    init:function () {
        //add resource to frameCache
        cc.spriteFrameCache.addSpriteFrames(res.ground_plist, res.ground_png);
        cc.spriteFrameCache.addSpriteFrames(res.obstacles_plist, res.obstacles_png);
        cc.spriteFrameCache.addSpriteFrames(res.jelly_and_items_plist, res.jelly_and_items_png);

        //create object factory with data.
        this.factoryObject = new FactoryObject(cc.loader.getRes(res.class_types),
            cc.loader.getRes(res.item_effect_types), cc.loader.getRes(res.object_types));

        //init for tmp character
        //todo: remove later
        this.tmpCharacter = new cc.Sprite("#jelly_coin2_1.png");
        var size = this.tmpCharacter.getContentSize();
        this.initCharacterPos = cc.p(300, 90 + size.height/2);
        this.tmpCharacter.setPosition(this.initCharacterPos);
        this.addChild(this.tmpCharacter);

        //create world with chunk data for world object.
        this.world = new World(cc.loader.getRes(res.chunks_json), this.factoryObject, this,
            this.tmpCharacter, this.initCharacterPos);
    },
    update:function (dt) {

        //update tmp character
        //todo: remove later
        var curentChaPos = this.tmpCharacter.getPosition();
        var nextChaPos = cc.p(curentChaPos.x+100*dt, curentChaPos.y);
        this.tmpCharacter.setPosition(nextChaPos);

        // tmp update position relative to the pos of character.
        //todo: remove later
        var currentPos = this.getPosition();
        var changeX = this.tmpCharacter.getPosition().x - this.initCharacterPos.x;
        var nextPos = cc.p(-changeX, currentPos.y);
        this.setPosition(nextPos);

        //update world accordingly to the character's pos.
        this.world.update(dt);
    }
});