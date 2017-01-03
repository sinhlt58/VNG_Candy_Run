/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAimation = cc.Layer.extend({
    labelPos:null,
    lableLayerPos:null,

    /*
     * Debug label*/
    label_AniPos: null,
    label_LayerPos: null,
    //label_

    world: null,
    factoryObject: null,

    characterAni: null,
    character: null,

    ctor: function () {
        this._super();
        this.init();
        this.scheduleUpdate();
        //this.setPosition(cc.p(0,-650));
    },
    init: function () {
        /*
         * debug by label
         * */

        this.label_AniPos = new cc.LabelTTF("This is aniPos", "Helvetica");
        this.label_AniPos.setFontSize(15);
        this.label_AniPos.setAnchorPoint(cc.p(0, 0.5));
        this.label_AniPos.setPosition(20, cc.winSize.height - 50);
        this.addChild(this.label_AniPos);

        this.label_LayerPos = new cc.LabelTTF("This is Layer Pos", "Helvetica");
        this.label_LayerPos.setFontSize(15);
        this.label_LayerPos.setAnchorPoint(cc.p(0, 0.5));
        this.label_LayerPos.setPosition(20, cc.winSize.height-100);
        this.addChild(this.label_LayerPos);


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

        //debug purposes
        this.labelPos = new cc.LabelTTF("This is Position", "Helvetica");
        this.labelPos.setFontSize(40);
        this.labelPos.setAnchorPoint(cc.p(0, 0.5));
        this.labelPos.setPosition(200, 400);
        //this.addChild(this.labelPos);

        this.lableLayerPos = new cc.LabelTTF("This is Position", "Helvetica");
        this.lableLayerPos.setFontSize(40);
        this.lableLayerPos.setAnchorPoint(cc.p(0, 0.5));
        this.lableLayerPos.setPosition(200, 400);
        //this.addChild(this.lableLayerPos);





        /*debug handle input*/




    },
    update:function (dt) {
        //handle inputs.

        this.character.update(dt);


        // tmp update position relative to the pos of character.
        //todo: remove later
        var currentPos = this.getPosition();
        var changeX = this.character.getPosition().x - this.character.getInitPosition().x;
        //var nextPos = cc.p(-changeX, -650);
        var nextPos = cc.p(-changeX, currentPos.y);
        this.setPosition(nextPos);


        //update world accordingly to the character's pos.
        this.world.update(dt);
    }
});