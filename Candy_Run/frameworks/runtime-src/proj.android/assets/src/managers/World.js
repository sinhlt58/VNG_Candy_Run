/**
 * Created by SinhBlack on 12/30/2016.
 */
var World = cc.Class.extend({
    chunks: null,
    factory:null,
    graphicsParent:null,
    triggers:null,
    tempCharacter:null,//todo: remove later
    initPosCharacter:null,//todo: remove later
    ctor:function (chunkData, factory, graphicsParent, tempCharacter, initPosCharacter) {
        this.chunks = chunkData;
        this.factory = factory;
        this.graphicsParent = graphicsParent;

        //todo: remove later
        this.tempCharacter = tempCharacter;
        this.initPosCharacter = initPosCharacter;

        this.init();
    },
    init:function () {
        //create object inside the screen.
        var visibleChunkIds = this.getVisibleChunkIds(this.tempCharacter.getPosition(),
            this.initPosCharacter, cc.view.getVisibleSize());
        for (var i=0; i<visibleChunkIds.length; i++){
            this.updateVisibleObjectForChunk(visibleChunkIds[i]);
        }

        //init triggers
        this.triggers = new WorldTriggers(this);
    },
    update:function (dt) {
        //update triggers
        this.triggers.update(dt);
        //console.log("After trigger update.");

        //check visible of objects in appropriate chunks
        var outChunkIds = this.getChunkIdsMayHaveObjectsOutOfScreen(this.tempCharacter.getPosition(),
            this.initPosCharacter, cc.view.getVisibleSize());
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
                        this.tempCharacter.getPosition(), this.initPosCharacter, cc.view.getVisibleSize())){
                    if (!objectData.hasOwnProperty("pObject") || objectData["pObject"] === null){
                        var object = this.factory.getAObjectByObjectTypeId(objectTypeId);
                        object.sprite.setAnchorPoint(cc.p(0, 0));
                        object.sprite.setPosition(cc.p(objectData.x, objectData.y));
                        this.graphicsParent.addChild(object.sprite);
                        objectData["pObject"] = object;
                    }
                }else{
                    if (objectData.hasOwnProperty("pObject") && objectData["pObject"] !== null){
                        var releasedObject = objectData["pObject"];
                        objectData["pObject"] = null;
                        releasedObject.sprite.removeFromParent();
                        this.factory.releaseObject(releasedObject);
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
        var minVisibleX = characterPos.x - characterInitPos.x;
        var maxVisibleX = characterPos.x + (visibleSize.width - characterInitPos.x);
        var chunkYId = parseInt(characterPos.y / this.getChunkHeight());
        var chunkWidth = this.getChunkWidth();
        var minVisibleChunkId = parseInt(minVisibleX / chunkWidth);
        var maxVisibleChunkId = parseInt(maxVisibleX / chunkWidth);
        var visibleChunkIds = [];
        for (var i=minVisibleChunkId; i<=maxVisibleChunkId; i++){
            visibleChunkIds.push(i + '-' + chunkYId);
        }
        return visibleChunkIds;
    },
    getChunkIdsMayHaveObjectsOutOfScreen:function (characterPos, characterInitPos, visibleSize) {
        var visibleChunkIds = this.getVisibleChunkIds(characterPos, characterInitPos, visibleSize);
        var resultChunkIds = [];
        resultChunkIds.push(visibleChunkIds[0]);
        resultChunkIds.push(visibleChunkIds[visibleChunkIds.length-1]);
        var splitMinChunkId = visibleChunkIds[0].split('-');
        var minChunkIdX = parseInt(splitMinChunkId[0]);
        if (minChunkIdX > 0){
            resultChunkIds.push(minChunkIdX-1 + '-' + splitMinChunkId[1]);
        }
        return resultChunkIds;
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
        return 92 * 4;
    },
    getChunkHeight:function () {
        return 650;
    }
});