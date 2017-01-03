/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAimation = cc.Layer.extend({

    /*
     * Debug label*/
    label_AniPos: null,
    label_LayerPos: null,
    //label_


    world: null,
    factoryObject: null,
    tmpCharacter: null,//todo: remove later
    initCharacterPos: null,//todo: remove later

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


        //init for tmp character
        //todo: remove later


        this.tmpCharacter = new cc.Sprite("#jelly_coin2_1.png");
        var size = this.tmpCharacter.getContentSize();
        //this.initCharacterPos = cc.p(300, 90 + size.height/2 + 650);
        this.initCharacterPos = cc.p(300, 90 + size.height / 2);
        this.tmpCharacter.setPosition(this.initCharacterPos);
        this.addChild(this.tmpCharacter);


        //create world with chunk data for world object.
        this.world = new World(cc.loader.getRes(res.chunks_json), this.factoryObject, this,
            this.tmpCharacter, this.initCharacterPos, this.characterAni);
    },
    update: function (dt) {
        /*
         * debug by label
         * */

        //Ani Position
        /*this.label_AniPos.setString("SpAnimation pos: " + this.characterAni.getPosition().x + " " + this.characterAni.getPosition().y);
        this.label_AniPos.setPosition({
            x: this.tmpCharacter.getPosition().x,
            y: this.tmpCharacter.getPosition().y + 500
        });


        //Layer position
        this.label_LayerPos.setString("Layer Pos: "+ this.getPosition().x+ " "+ this.getPosition().y);
        this.label_LayerPos.setPosition({
            x: this.tmpCharacter.getPosition().x,
            y: this.tmpCharacter.getPosition().y + 450,
        });*/


        //update tmp character
        //todo: remove later
        var curentChaPos = this.tmpCharacter.getPosition();
        var nextChaPos = cc.p(curentChaPos.x + 300 * dt, curentChaPos.y);
        this.tmpCharacter.setPosition(nextChaPos);


        this.character.update(dt);

        // simulation update Anipos by coin

        /*var aniPos = {
            x: this.getPosition().x,
            y: this.getPosition().y+300
        }
        this.characterAni.setPosition(nextChaPos);
        //console.log(aniPos);*/


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