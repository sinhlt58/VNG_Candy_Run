/**
 * Created by Fresher on 1/3/2017.
 */
var CollisionDetector = cc.Class.extend({
    world: null,
    ctor: function (world) {
        this.world = world;

    },
    update: function (dt) {
        //update array contains items, ground, obstacles collide with character.
        var objectsColldingWithCharacter = this.getObjectsCollidingWithCharacter(dt);

        //handle collisions character with item objects.

    },
    handleCollision: function (character, collisionObjects) {
        // handle with character
        // handle with items
    },
    getObjectsCollidingWithCharacter: function (dt) {
        var charPos = this.world.character.getPosition();
        var bodySize = this.world.character.getContentSize();

        var objectsAroundCharacter = this.world.getObjectsAroundCharacter(charPos, bodySize);
        var objectsCollidingWithCharacter = {};

        for (var i = 0; i < objectsAroundCharacter.length; i++) {
            var objectInMap = objectsAroundCharacter[i];
            if (objectInMap.hasOwnProperty("pObject") && objectInMap["pObject"] != null) {
                var objectPos = objectInMap["pObject"].sprite.getPosition();
                var objectSize = objectInMap["pObject"].sprite.getContentSize();
                cc.log("Inside check collison");
                cc.log("Char pos: ", charPos);
                cc.log("Char bodySize: ", bodySize);
                cc.log("object pos: ", objectPos);
                cc.log("object size: ", objectSize);

                if (this.isCharacterOverlapWithObject(charPos, bodySize, objectPos, objectSize)) {
                    objectInMap["pObject"].sprite.setVisible(false);
                    cc.log("Log inside if");
                    //cc.director.pause();
                }

            }
        }

    },
    isCharacterOverlapWithObject: function (characterPos, characterBodySize, objectPos, objectSize) {


        var characterLeft = characterPos.x - characterBodySize.width / 2 - 100;
        var characterRight = characterPos.x + characterBodySize.width / 2 - 100;
        var characterTop = characterPos.y + characterBodySize.height / 2;
        var characterBottom = characterPos.y - characterBodySize.height / 2;


        cc.log(this.world.graphicsParent);


        var rect1 = {
            x: characterLeft,
            y: characterBottom,
            width: characterBodySize.width,
            height: characterBodySize.height

        };

        //cc.log("characterBottom: ", characterBottom);
        var objectLeft = objectPos.x;
        var objectRight = objectPos.x + objectSize.width;
        var objectTop = objectPos.y + objectSize.height;
        var objectBottom = objectPos.y;


        var rect2 = {
            x: objectLeft,
            y: objectBottom,
            width: objectSize.width,
            height: objectSize.height,
        };

        cc.log(cc.rectIntersectsRect(rect1, rect2));

        //return cc.rectIntersectsRect(rect1, rect2);

        //cc.log("objectTop: ", objectTop);

        return (characterLeft <= objectRight && characterRight >= objectLeft &&
        characterTop >= objectBottom && characterBottom <= objectTop);
    }
});