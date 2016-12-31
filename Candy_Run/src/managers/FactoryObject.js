/**
 * Created by SinhBlack on 12/30/2016.
 */

var FactoryObject = cc.Class.extend({
    classTypes:null,
    itemEffectTypes:null,
    objectTypes:null,
    ctor:function (classTypes, itemEffectTypes, objectTypes) {
        this.classTypes = classTypes;
        this.itemEffectTypes = itemEffectTypes;
        this.objectTypes = objectTypes;
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
        var object = {};

        if (classType == "Item"){
            object = new Item(objectTypeId);
            var frames = objectTypeData["frames"];
            object.sprite = new cc.Sprite("#" + frames[0]);
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

                object.sprite.runAction(action);
            }

            //todo: latter add effects for items.

        }else if(classType == "Ground"){
            object = new Ground(objectTypeId);
            object.sprite = new cc.Sprite("#" + objectTypeData["texture"]);

        }else if(classType == "Obstacle"){
            object = new Obstacle(objectTypeId);
            object.sprite = new cc.Sprite("#" + objectTypeData["texture"]);
            object.damage = objectTypeData["damage"];
        }

        return object;
    }
});