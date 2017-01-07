/**
 * Created by Fresher on 1/3/2017.
 */
var CollisionDetector = cc.Class.extend({
    world: null,


    drawNode: null,

    drawDot: null,

    ctor: function (world) {
        this.world = world;
        this.drawNode= new cc.DrawNode();

        //this.drawDot= new cc.Dra

        this.world.graphicsParent.addChild(this.drawNode, 1000);

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

                if (this.isCharacterOverlapWithObject(charPos, bodySize, objectPos, objectSize)) {
                    objectInMap["pObject"].sprite.setVisible(false);
                    //cc.log("Log inside if");
                }

            }
        }

    },
    isCharacterOverlapWithObject: function (characterPos, characterBodySize, objectPos, objectSize) {


        var characterLeft = characterPos.x - characterBodySize.width / 2 - 92;
        var characterRight = characterPos.x + characterBodySize.width / 2 - 92;
        var characterTop = characterPos.y + characterBodySize.height / 2-25 ;
        var characterBottom = characterPos.y - characterBodySize.height / 2-25;





        //cc.log(this.world.graphicsParent);


        //debug by drawNode to draw a rectangle to check collision
        var layer= this.world.graphicsParent;
        var posRectOrigin= {
            x: characterLeft,
            y: characterBottom
        };
        var posRectDes= {
            x: characterRight,
            y: characterTop

        };
        var colorRect= cc.color(255,255, 255, 0);
        var colorLine= cc.color(255, 0,0, 128);
        this.drawNode.clear();
        this.drawNode.drawRect(posRectOrigin, posRectDes, colorRect, 2, colorLine);
        this.drawNode.drawDot(characterPos, 5, cc.color(255, 0, 0, 128));

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

        //cc.log(cc.rectIntersectsRect(rect1, rect2));

        //return cc.rectIntersectsRect(rect1, rect2);

        //cc.log("objectTop: ", objectTop);

        return (characterLeft <= objectRight && characterRight >= objectLeft &&
        characterTop >= objectBottom && characterBottom <= objectTop);
    }
});