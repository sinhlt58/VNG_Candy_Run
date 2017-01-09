/**
 * Created by Fresher on 1/3/2017.
 */
var CollisionDetector = cc.Class.extend({


    offsetX: 0,

    offsetY: 0,


    world: null,

    frames: 0,
    drawNode: null,


    //drawDot: null,

    ctor: function (world) {
        this.world = world;
        this.drawNode = new cc.DrawNode();

        //this.drawDot= new cc.Dra

        this.world.graphicsParent.addChild(this.drawNode, 100);

        /*this.offsetX = -40 * this.world.character.scaleSize;
        this.offsetY = 0;*/

    },
    update: function (dt) {


        this.offsetX= this.world.character.offsetCollX;
        this.offsetY=this.world.character.offsetCollY;


        //fix me offset X and Y must change by stateMovement
        /*if (this.world.character.stateMachine.stateMovement instanceof StateSliding) {
            this.offsetY = -39;
        } else {
            this.offsetX = -40 * this.world.character.scaleSize;
            this.offsetY = 0;
        }*/







        this.frames++;
        //update array contains items, ground, obstacles collide with character.
        var objectsColldingWithCharacter = this.getDataObjectsCollidingWithCharacter(dt);

        //handle collisions character with item objects.
        this.handleCollision(this.world.character, objectsColldingWithCharacter);
    },
    handleCollision: function (character, collisionObjects) {
        // handle with character
        var i;


        //handle collide with ground
        if (collisionObjects.hasOwnProperty(globals.CLASS_TYPE_GROUND)) {
            //change state to running or ... somethings not thought yet

            var isRunning = character.stateMachine.stateMovement instanceof StateRunning;

            if (isRunning == false) {
                // maybe jumping or sliding
                //if not sliding turn back to running else
                if (character.stateMachine.stateMovement instanceof StateSliding ) {
                    //character.stateMachine.setStateMovement(new StateRunning(character));
                }else if (character.stateMachine.stateMovement instanceof StateJumping ){

                    //is jumping and going down
                    if(character.velocity.y<=0){
                        character.stateMachine.setStateMovement(new StateRunning(character));
                    }
                }else if(character.stateMachine.stateMovement instanceof StateDoubleJumping ){
                    character.stateMachine.setStateMovement(new StateRunning(character));
                }
            } else {
                // is running
            }


        } else {
            //run here when jump or go to hole

            var character= this.world.character;

            if(character.stateMachine.stateMovement instanceof StateRunning || character.stateMachine.stateMovement instanceof StateSliding){


                cc.log("Die");
            }


        }


        if (collisionObjects.hasOwnProperty(globals.CLASS_TYPE_ITEM)) {
            var itemData = collisionObjects[globals.CLASS_TYPE_ITEM];
            for (i = 0; i < itemData.length; i++) {
                var itemDataObject = itemData[i];
                var itemObject = itemDataObject["pObject"];
                //do effects here
                itemObject.doEffects(cr.game, this.world);
                itemObject.sprite.setVisible(false);
            }

        } else {
            // nothing here
        }

        if (collisionObjects.hasOwnProperty(globals.CLASS_TYPE_OBSTACLE)) {
            // apply damage or die...

        } else {

            // nothing here

        }

        // handle with items
    },
    getDataObjectsCollidingWithCharacter: function (dt) {


        // get character position and body size
        var charPos = this.world.character.getPosition();
        var bodySize = this.world.character.getContentSize();


        //debug collision by drawing a boundary box for character
        var characterLeft = charPos.x - bodySize.width / 2 + this.offsetX;
        var characterRight = charPos.x + bodySize.width / 2 + this.offsetX;
        var characterTop = charPos.y + bodySize.height / 2 + this.offsetY;
        var characterBottom = charPos.y - bodySize.height / 2 + this.offsetY;
        var posRectOrigin = {
            x: characterLeft,
            y: characterBottom
        };
        var posRectDes = {
            x: characterRight,
            y: characterTop

        };
        var colorRect = cc.color(255, 255, 255, 0);
        var colorLine = cc.color(255, 0, 0, 128);
        this.drawNode.clear();
        this.drawNode.drawRect(posRectOrigin, posRectDes, colorRect, 2, colorLine);
        this.drawNode.drawDot(charPos, 5, cc.color(255, 0, 0, 128));


        var objectsAroundCharacter = this.world.getObjectsAroundCharacter(charPos, bodySize);
        var dataObjectsCollidingWithCharacter = {};

        for (var i = 0; i < objectsAroundCharacter.length; i++) {
            var objectDataInMap = objectsAroundCharacter[i];
            if (objectDataInMap.hasOwnProperty("pObject") && objectDataInMap["pObject"] != null) {
                var object = objectDataInMap["pObject"];
                var objectPos = object.sprite.getPosition();
                var objectSize = object.sprite.getContentSize();
                if (object.sprite.isVisible()) {
                    if (this.isCharacterOverlapWithObject(charPos, bodySize, objectPos, objectSize)) {
                        var objectTypeId = object.getObjectTypeId();
                        var classType = this.world.factory.getClassTypeByObjecType(objectTypeId);
                        if (!dataObjectsCollidingWithCharacter.hasOwnProperty(classType)) {
                            dataObjectsCollidingWithCharacter[classType] = [];
                        }
                        dataObjectsCollidingWithCharacter[classType].push(objectDataInMap);
                    }
                }
            }
        }
        return dataObjectsCollidingWithCharacter;
    },
    isCharacterOverlapWithObject: function (characterPos, characterBodySize, objectPos, objectSize) {



        //fix position of rectangle for detect collision
        var characterLeft = characterPos.x - characterBodySize.width / 2 + this.offsetX;
        var characterRight = characterPos.x + characterBodySize.width / 2 + this.offsetX;
        var characterTop = characterPos.y + characterBodySize.height / 2 + this.offsetY;
        var characterBottom = characterPos.y - characterBodySize.height / 2 + this.offsetY;


        //cc.log(this.world.graphicsParent);

        //debug by drawNode to draw a rectangle to check collision
        //var layer= this.world.graphicsParent;
        /* var posRectOrigin= {
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
         */
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