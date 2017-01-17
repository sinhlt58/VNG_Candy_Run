/**
 * Created by SinhBlack on 12/30/2016.
 */
var World = cc.Class.extend({
    chunks: null,
    factory:null,
    graphicsParent:null,
    triggers:null,
    character: null,
    collisionDetector:null,
    isNeedToInitVisibleChunks:false,
    debugDrawNode:null,
    pet:null,

    isNeedToUpdateLevelIn: true,
    currentLevelIn: 1,
    ctor:function (chunkData, factory, graphicsParent, character, pet) {
        this.chunks = chunkData;
        this.factory = factory;
        this.graphicsParent = graphicsParent;

        //init character
        this.character = character;
        this.pet = pet;

        this.init();
    },
    //create object inside the current screen.
    init:function () {

        //debug
        this.debugDrawNode = new cc.DrawNode();
        //this.graphicsParent.addChild(this.debugDrawNode);

        var visibleChunkIds = this.getVisibleChunkIds(this.character.getPosition(),
            this.character.getInitPosition(), cc.view.getVisibleSize());

        //
        for (var i=0; i<visibleChunkIds.length; i++){
            this.updateVisibleObjectForChunk(visibleChunkIds[i]);
        }

        //init triggers
        this.triggers = new WorldTriggers(this);

        //init collision detector.
        this.collisionDetector = new CollisionDetector(this);

        //init levels data
        cr.level_manager.init(cc.loader.getRes(res.levels_json), this);
        this.currentLevelIn = cr.level_manager.getLevelByPosition(this.character.getPosition());

        //test effects
        // var j=0;
        // for (i=1000; i<= 1015; i++){
        //     this.factory.runEffectAtPosition(i, cc.p(j*100 + 50, 300), this);
        //     j++;
        // }

        Game.world = this;
    },
    update:function (dt) {
        //update collision.
        this.collisionDetector.update(dt);

        this.character.update(dt);

        if (this.isNeedToUpdateLevelIn){
            this.currentLevelIn = cr.level_manager.getLevelByPosition(this.character.getPosition());
        }
        // cc.log("Level in: ", cr.level_manager.getLevelByPosition(this.character.getPosition()));

        this.pet.update(dt);

        //update layer position relative to the pos of character.
        // this.graphicsParent.updateCamera(this.character);
        Camera.update(this.character.getPosition(),
            this.character.getInitPosition(), this.character.getContentSize(), dt);

        //update triggers
        this.triggers.update(dt);

        //check visible of objects in appropriate chunks
        var chunkIdsNeedToUpdate;
        if (!this.getIsNeedToInitVisibleChunks()){
            chunkIdsNeedToUpdate = this.getChunkIdsMayHaveObjectsOutOfScreen(this.character.getPosition(),
                this.character.getInitPosition(), cc.view.getVisibleSize());
        }else{
            chunkIdsNeedToUpdate = this.getVisibleChunkIds(this.character.getPosition(),
                this.character.getInitPosition(), cc.view.getVisibleSize());
            this.setIsNeedToInitVisibleChunks(false);
        }
        //this.debugDrawChunks();
        for (var i=0; i<chunkIdsNeedToUpdate.length; i++){
            this.updateVisibleObjectForChunk(chunkIdsNeedToUpdate[i]);
        }
        //update visible for chunks (just create objects inside the screen that are not rendered yet)
        //update objects inside the screen.
        this.updateObjectInsideTheScreen(dt);

        // cc.log("effect length: ", this.factory.objectPool.available["Effect"].length);
    },
    updateVisibleObjectForChunk:function (chunkId) {
        var chunkData = this.getChunkDataById(chunkId);
        var objectTypeIds = this.getObjectTypeIdsInChunk(chunkId);
        var i, j;
        for (i=0; i<objectTypeIds.length; i++){
            var objectTypeId = objectTypeIds[i];
            var sizeItem = this.factory.getSizeByObjectTypeId(objectTypeId);
            for (j=0; j<chunkData[objectTypeId].length; j++){
                var objectData = chunkData[objectTypeId][j];
                // if (this.isObjectInsideScreen(objectData.x, sizeItem.width,
                //         this.character.getPosition(), this.character.getInitPosition(), cc.view.getVisibleSize())){
                if (this.isObjectInsideTheScreen(cc.p(objectData.x, objectData.y), sizeItem)){
                    if (!objectData.hasOwnProperty("pObject") || objectData["pObject"] === null){
                        var object = this.factory.getAObjectByObjectTypeId(objectTypeId);
                        object.sprite.setAnchorPoint(cc.p(0, 0));
                        object.sprite.setVisible(true);
                        object.sprite.setPosition(cc.p(objectData.x, objectData.y));

                        //trivial here @@. call enter after have the default position
                        var classType = this.factory.getClassTypeByObjecType(objectTypeId);
                        if (classType == globals.CLASS_TYPE_OBSTACLE)
                            object.stateMachineObstacle.stateObstacle.onEnter(object);

                        this.graphicsParent.addChild(object.sprite);
                        object.sprite.setUserData(objectData);
                        objectData["pObject"] = object;
                    }
                }else{
                   // this.releaseAObjectData(objectData);
                }
            }
        }
    },
    getObjectTypeIdsInChunk:function (chunkId) {
        var objectTypeIds = [];
        var chunkData = this.getChunkDataById(chunkId);
        for (var id in chunkData){
            if(chunkData.hasOwnProperty(id)){
                objectTypeIds.push(id);
            }
        }
        return objectTypeIds;
    },
    getObjectTypeIdsInChunks:function (chunkIds) {
        var objectTypeIds = [];
        for(var i=0; i<chunkIds.length;i++){
            objectTypeIds.push.apply(objectTypeIds ,this.getObjectTypeIdsInChunk(chunkIds[i]));
        }
        return objectTypeIds;
    },
    getChunkDataById:function (chunkId) {
        if (this.chunks.hasOwnProperty(chunkId))
            return this.chunks[chunkId]['data'];
    },
    getVisibleChunkIds:function (characterPos, characterInitPos, visibleSize) {
        var minPos = cc.p(characterPos.x - characterInitPos.x, characterPos.y);
        var maxPos = cc.p(characterPos.x + (visibleSize.width - characterInitPos.x - 1), characterPos.y);
        return this.getChunkIdsByRange(minPos, maxPos);
    },
    getChunkIdsMayHaveObjectsOutOfScreen:function (characterPos, characterInitPos, visibleSize) {
        var visibleChunkIds = this.getVisibleChunkIds(characterPos, characterInitPos, visibleSize);
        var resultChunkIds = [];
        if (visibleChunkIds.length > 2){
            //resultChunkIds.push(visibleChunkIds[0]);
            resultChunkIds.push(visibleChunkIds[visibleChunkIds.length-1]);
            resultChunkIds.push(visibleChunkIds[visibleChunkIds.length-2]);
            // var splitMinChunkId = visibleChunkIds[0].split('-');
            // var minChunkIdX = parseInt(splitMinChunkId[0]);
            // if (minChunkIdX > 1){
            //     resultChunkIds.push(minChunkIdX-1 + '-' + splitMinChunkId[1]);
            // }
            return resultChunkIds;
        }
    },
    isObjectInsideScreen:function (posX, width, characterPos, characterInitPos, visibleSize) {
        var minVisibleX = characterPos.x - characterInitPos.x;
        var maxVisibleX = characterPos.x + (visibleSize.width - characterInitPos.x);
        return (minVisibleX - width) < posX && posX < maxVisibleX;
    },
    getChunkIdsByRange:function (minPos, maxPos) {
        var minXId = parseInt(minPos.x / this.getChunkWidth());
       // if (minXId < 0) minXId = 0;
        var maxXId = parseInt(maxPos.x / this.getChunkWidth());
        var chunkYId = parseInt(minPos.y / this.getChunkHeight());
        var chunkIds = [];
        for (var i=minXId; i<=maxXId; i++){
            chunkIds.push(i + '-' + chunkYId);
        }
        return chunkIds;
    },
    getChunkWidth:function () {
        return 92 * 2;
    },
    getChunkHeight:function () {
        return 480 + 300;
    },
    getChunkIdsAroundCharacter:function (characterPos, bodySize) {
        return this.getVisibleChunkIds(characterPos, this.character.getInitPosition(), cc.view.getVisibleSize());
    },
    getObjectsDataByChunkIds:function (chunkIds) {
        var objectsInChunks = [];
        for (var index in chunkIds){
            if (chunkIds.hasOwnProperty(index)){
                var chunkId = chunkIds[index];
                var chunkData = this.getChunkDataById(chunkId);
                var objectTypeIds = this.getObjectTypeIdsInChunk(chunkId);
                var i, j;
                for (i=0; i<objectTypeIds.length; i++){
                    var objectTypeId = objectTypeIds[i];
                    for (j=0; j<chunkData[objectTypeId].length; j++){
                        var objectData = chunkData[objectTypeId][j];
                        if (objectData.hasOwnProperty("pObject") && objectData["pObject"] != null){
                            objectsInChunks.push(objectData);
                        }
                    }
                }
            }
        }
        return objectsInChunks;
    },
    getObjectsAroundCharacter:function (characterPos, bodySize) {
        return this.getObjectsDataByChunkIds(this.getChunkIdsAroundCharacter(characterPos, bodySize));
    },
    getAllCurrentRenderedObjectsData:function (characterPos, characterInitPos, visibleSize) {
        // var visibleChunkIds = this.getVisibleChunkIds(characterPos, characterInitPos, visibleSize);
        // if (visibleChunkIds.length > 0){
        //     var splitedChunkId = visibleChunkIds[0].split("-")[0];
        //     var minChunkIdX = parseInt(splitedChunkId[0]);
        //     var minChunkIdY = parseInt(splitedChunkId[1]);
        //     minChunkIdX--;
        //     if(minChunkIdX >= 0){
        //         visibleChunkIds.push(minChunkIdX + '-' + minChunkIdY);
        //     }
        // }
        var renderedBbjectsData = [];
        var children = this.graphicsParent.getChildren();
        for(var i=0; i<children.length; i++){
            var child = children[i];
            var userData = child.getUserData();
            if (child != this.character && child != this.pet && userData != null){
                renderedBbjectsData.push(userData);
            }
        }
        return renderedBbjectsData;
    },
    releaseAObjectData:function (objectData) {
        if (objectData.hasOwnProperty("pObject") && objectData["pObject"] !== null){
            var releasedObject = objectData["pObject"];
            releasedObject.sprite.setVisible(false);
            releasedObject.sprite.setUserData(null);
            releasedObject.sprite.removeFromParent();
            this.factory.releaseObject(releasedObject);
            objectData["pObject"] = null;
        } 
    },
    releaseAllCurrentRenderedObjects:function () {
        var renderedObjects = this.getAllCurrentRenderedObjectsData(this.character.getPosition(),
            this.character.getInitPosition(), cc.view.getVisibleSize());
        for (var i=0; i<renderedObjects.length; i++){
            this.releaseAObjectData(renderedObjects[i]);
        }
    },
    setIsNeedToInitVisibleChunks:function (val) {
        this.isNeedToInitVisibleChunks = val;
    },
    getIsNeedToInitVisibleChunks:function () {
        return this.isNeedToInitVisibleChunks;
    },
    debugDrawChunks:function () {
        var visibleChunks = this.getVisibleChunkIds(this.character.getPosition(),
            this.character.getInitPosition(), cc.view.getVisibleSize());
        this.debugDrawNode.clear();
        var colorRect= cc.color(255, 0, 0, 128);
        for (var i=0; i<visibleChunks.length; i++){
            var chunkId = visibleChunks[i];
            var splitChunkId = chunkId.split("-");
            var chunkIdX = parseInt(splitChunkId[0]) * this.getChunkWidth();
            var chunkIdY = parseInt(splitChunkId[1]) * this.getChunkHeight() + this.getChunkHeight();
            this.debugDrawNode.drawSegment(cc.p(chunkIdX, 0), cc.p(chunkIdX, chunkIdY), 2, colorRect);
        }
    },
    setTriggerHeaven:function (value) {
        this.triggers.triggerHeavenAndGround.isTriggerHeaven = value;
    },
    //update invisible objects.
    updateObjectInsideTheScreen:function (dt) {
        var renderedObjectsData = this.getAllCurrentRenderedObjectsData(this.character.getPosition(),
            this.character.getInitPosition(), cc.view.getVisibleSize());
        for (var i=0; i<renderedObjectsData.length; i++){
            var objectNeedToUpdate = renderedObjectsData[i]["pObject"];
            if (objectNeedToUpdate != null)
                objectNeedToUpdate.update(dt, this);
        }

    },

    isObjectInsideTheScreen:function (pos, size) {
        var charPos = this.character.getPosition();
        var charInitPos = this.character.getInitPosition();
        var visibleSize = cc.view.getVisibleSize();
        var currentCameraY = this.graphicsParent.getCurrentCameraY();
        var minX = charPos.x - (charInitPos.x + size.width);
        var maxX = charPos.x + (visibleSize.width - charInitPos.x);
        var minY = currentCameraY - (visibleSize.height/2 + size.height);
        var maxY = currentCameraY + visibleSize.height/2;

        return minX < pos.x && pos.x < maxX &&
            minY < pos.y && pos.y < maxY;
    },
    
    getObjectItemsInRadius:function (characterPos, radius) {
        var minXPos = characterPos.x - radius;
        if (minXPos < 0) minXPos = 0;
        var maxXPos = characterPos.x + radius;
        var chunkIdsInRadius = this.getChunkIdsByRange(cc.p(minXPos, characterPos.y), cc.p(maxXPos, characterPos.y));
        var objectsDataInRadius = this.getObjectsDataByChunkIds(chunkIdsInRadius);
        var itemObjects = [];
        for (var i=0; i<objectsDataInRadius.length; i++){
            var object = objectsDataInRadius[i]["pObject"];
            var objectPos = object.sprite.getPosition();
            var distanceToCharacter = Math.sqrt(( (objectPos.x - characterPos.x)*(objectPos.x - characterPos.x)
            + (objectPos.y - characterPos.y)*(objectPos.y - characterPos.y) ));
            if (object instanceof Item && distanceToCharacter <= radius && object.sprite.isVisible()){
                itemObjects.push(object);
            }
        }
        return itemObjects;
    },

    getObjectItemsByTypeInRadius:function (characterPos, radius, objectType) {
        var minXPos = characterPos.x - radius;
        if (minXPos < 0) minXPos = 0;
        var maxXPos = characterPos.x + radius;
        var chunkIdsInRadius = this.getChunkIdsByRange(cc.p(minXPos, characterPos.y), cc.p(maxXPos, characterPos.y));
        var objectsDataInRadius = this.getObjectsDataByChunkIds(chunkIdsInRadius);
        var itemObjects = [];
        for (var i=0; i<objectsDataInRadius.length; i++){
            var object = objectsDataInRadius[i]["pObject"];
            var objectPos = object.sprite.getPosition();
            var distanceToCharacter = Math.sqrt(( (objectPos.x - characterPos.x)*(objectPos.x - characterPos.x)
            + (objectPos.y - characterPos.y)*(objectPos.y - characterPos.y) ));
            if (object instanceof Item && distanceToCharacter <= radius && object.sprite.isVisible()
              && object.getObjectTypeId() == objectType){
                itemObjects.push(object);
            }
        }
        return itemObjects;
    },
    
    spawnEffectAt:function (effectType, position) {
        this.factory.runEffectAtPosition(effectType, position, this);
    }
});