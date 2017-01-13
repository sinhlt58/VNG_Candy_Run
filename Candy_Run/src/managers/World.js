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
    ctor:function (chunkData, factory, graphicsParent, character) {
        this.chunks = chunkData;
        this.factory = factory;
        this.graphicsParent = graphicsParent;

        //init character
        this.character = character;

        this.init();
    },
    //create object inside the current screen.
    init:function () {

        //debug
        this.debugDrawNode = new cc.DrawNode();
        this.graphicsParent.addChild(this.debugDrawNode);

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
    },
    update:function (dt) {
        //update collision.
        this.collisionDetector.update(dt);

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
                if (this.isObjectInsideScreen(objectData.x, sizeItem.width,
                        this.character.getPosition(), this.character.getInitPosition(), cc.view.getVisibleSize())){
                    if (!objectData.hasOwnProperty("pObject") || objectData["pObject"] === null){
                        var object = this.factory.getAObjectByObjectTypeId(objectTypeId);
                        object.sprite.setAnchorPoint(cc.p(0, 0));
                        object.sprite.setVisible(true);
                        object.sprite.setPosition(cc.p(objectData.x, objectData.y));
                        this.graphicsParent.addChild(object.sprite);
                        object.sprite.setUserData(objectData);
                        objectData["pObject"] = object;
                    }
                }else{
                    if (objectData.hasOwnProperty("pObject") && objectData["pObject"] !== null){
                        var releasedObject = objectData["pObject"];
                        releasedObject.sprite.setUserData(null);
                        releasedObject.sprite.removeFromParent();
                        this.factory.releaseObject(releasedObject);
                        objectData["pObject"] = null;
                    }
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
            resultChunkIds.push(visibleChunkIds[0]);
            resultChunkIds.push(visibleChunkIds[visibleChunkIds.length-1]);
            resultChunkIds.push(visibleChunkIds[visibleChunkIds.length-2]);
            var splitMinChunkId = visibleChunkIds[0].split('-');
            var minChunkIdX = parseInt(splitMinChunkId[0]);
            if (minChunkIdX > 1){
                resultChunkIds.push(minChunkIdX-1 + '-' + splitMinChunkId[1]);
            }
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
        var minCollisionX = characterPos.x - bodySize.width/2 - 128;
        if (minCollisionX < 0)
            minCollisionX = 0;
        var maxCollisionX = characterPos.x + bodySize.width/2;
        var minCollisionChunkIdX = parseInt(minCollisionX / (this.getChunkWidth()));
        var maxCollisionChunkIdX = parseInt(maxCollisionX / (this.getChunkWidth()));
        var chunkIdY = parseInt(characterPos.y / this.getChunkHeight());
        var collisionChunkIds = [];
        for (var idX=minCollisionChunkIdX; idX<=maxCollisionChunkIdX; idX++){
            collisionChunkIds.push(idX + '-' + chunkIdY);
        }
        return collisionChunkIds;
    },
    getObjectsByChunkIds:function (chunkIds) {
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
        return this.getObjectsByChunkIds(this.getChunkIdsAroundCharacter(characterPos, bodySize));
    },
    getAllCurrentRenderedObjectsData:function (characterPos, characterInitPos, visibleSize) {
        var visibleChunkIds = this.getVisibleChunkIds(characterPos, characterInitPos, visibleSize);
        if (visibleChunkIds.length > 0){
            var splitedChunkId = visibleChunkIds[0].split("-")[0];
            var minChunkIdX = parseInt(splitedChunkId[0]);
            var minChunkIdY = parseInt(splitedChunkId[1]);
            minChunkIdX--;
            if(minChunkIdX >= 0){
                visibleChunkIds.push(minChunkIdX + '-' + minChunkIdY);
            }
        }
        return this.getObjectsByChunkIds(visibleChunkIds);
    },
    releaseAObjectData:function (objectData) {
        if (objectData.hasOwnProperty("pObject") && objectData["pObject"] !== null){
            var releasedObject = objectData["pObject"];
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
    getPlusChunkId:function (chunkId, n) {
        var splitChunkId = chunkId.split("-");
        var newChunkIdX = parseInt(splitChunkId[0]) + n;
        return newChunkIdX + "-" + splitChunkId[1];
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
        //cc.log("renderedObjectsLength: ", renderedObjectsData.length);
        //cc.log("child of parents", this.graphicsParent.getChildrenCount());
        for (var i=0; i<renderedObjectsData.length; i++){
            var objectNeedToUpdate = renderedObjectsData[i]["pObject"];
            // if (!(objectNeedToUpdate instanceof Ground)){
            objectNeedToUpdate.update(dt, this);
            // }
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
    }
});