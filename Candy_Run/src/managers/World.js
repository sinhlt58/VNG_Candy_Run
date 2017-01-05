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
        var outChunkIds = this.getChunkIdsMayHaveObjectsOutOfScreen(this.character.getPosition(),
            this.character.getInitPosition(), cc.view.getVisibleSize());

        for (var i=0; i<outChunkIds.length; i++){
            this.updateVisibleObjectForChunk(outChunkIds[i]);
        }
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
                        object.sprite.setPosition(cc.p(objectData.x, objectData.y));
                        this.graphicsParent.addChild(object.sprite);
                        //object.sprite.release();
                        objectData["pObject"] = object;
                    }
                }else{
                    if (objectData.hasOwnProperty("pObject") && objectData["pObject"] !== null){
                        var releasedObject = objectData["pObject"];
                        //releasedObject.sprite.retain();
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
            if (minChunkIdX > 0){
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
        return 650;
    }
});