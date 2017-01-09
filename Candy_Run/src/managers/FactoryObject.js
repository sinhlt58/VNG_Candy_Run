/**
 * Created by SinhBlack on 12/30/2016.
 */

var FactoryObject = cc.Class.extend({
    classTypes:null,
    itemEffectTypes:null,
    objectTypes:null,
    objectPool:null,
    testNumCreatedAnimation:0,
    ctor:function (classTypes, itemEffectTypes, objectTypes) {
        this.classTypes = classTypes;
        this.itemEffectTypes = itemEffectTypes;
        this.objectTypes = objectTypes;

        var classTypesArray = [];
        for (var k in classTypes){
            if(classTypes.hasOwnProperty(k)){
                classTypesArray.push(classTypes[k]);
            }
        }
        this.objectPool = new ObjectPool(classTypesArray);
    },
    getObjectTypeData:function (objectTypeId) {
        return this.objectTypes[objectTypeId];
    },
    getClassTypeByObjecType:function (objectType) {
        return this.classTypes[this.objectTypes[objectType]['classType']];
    },
    getAObjectByObjectTypeId:function (objectTypeId) {
        var classType = this.getClassTypeByObjecType(objectTypeId);
        var objectTypeData = this.getObjectTypeData(objectTypeId);
        var object = this.objectPool.getObjectByClassType(classType);

        if (object.getObjectTypeId() == objectTypeId){
            return object;
        }

        object.setObjectTypeId(objectTypeId);

        if (classType == globals.CLASS_TYPE_ITEM){
            var frames = objectTypeData["frames"];
            this.changeTextureOfSprite(object.sprite, frames[0]);
            object.score = objectTypeData["score"];
            object.money = objectTypeData["money"];
            //todo: animation for item
            if (frames.length > 1){
                var animFrames = [];
                for (var i=0; i<frames.length; i++){
                    var frame = cc.spriteFrameCache.getSpriteFrame(frames[i]);
                    animFrames.push(frame);
                }
                var animation = new cc.Animation(animFrames, objectTypeData['frameRate']);
                var action = new cc.RepeatForever(new cc.Animate(animation));
                this.testNumCreatedAnimation++;
                object.sprite.stopAllActions();
                object.sprite.runAction(action);
            }
            //todo: latter add effects for items.

            for (i=0; i<objectTypeData["effects"].length; i++){
                var effectType = objectTypeData["effects"][i];
                if (effectType == globals.ITEM_EFFECT_LETTER){
                    object.letter = objectTypeData["letter"];
                }
                object.addAEffect(cr.item_effect_manager.getItemEffectByType(effectType));
            }

        }else if(classType == globals.CLASS_TYPE_GROUND){
            this.changeTextureOfSprite(object.sprite, objectTypeData["texture"]);
        }else if(classType == globals.CLASS_TYPE_OBSTACLE){
            this.changeTextureOfSprite(object.sprite, objectTypeData["texture"]);
            object.damage = objectTypeData["damage"];
        }
        return object;
    },
    releaseObject:function (object) {
        var classType = this.getClassTypeByObjecType(object.getObjectTypeId());
        this.objectPool.releaseObject(object, classType);
    },
    changeTextureOfSprite:function (sprite, frameName) {
        var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
        sprite.setSpriteFrame(frame);
    },
    getSizeByObjectTypeId:function (objectTypeId) {
        var classType = this.getClassTypeByObjecType(objectTypeId);
        var objectTypeData = this.getObjectTypeData(objectTypeId);
        var frameName;
        if (classType == "Item"){
            frameName = objectTypeData["frames"][0];
        }else{
            frameName = objectTypeData["texture"];
        }
        var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
        return frame.getOriginalSize();
    }
});