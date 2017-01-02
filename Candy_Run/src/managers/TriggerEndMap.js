/**
 * Created by SinhBlack on 1/2/2017.
 */
var TriggerEndMap = Trigger.extend({
    firstTime:true,
    ctor:function (world) {
        this._super(world);
    },
    update:function (dt) {
        console.log("Inside trigger end map.");
        var characterPos = this.world.tempCharacter.getPosition();//todo: change later
        var characterInitPos = this.world.initPosCharacter;//todo: change later
        var visibleSize = cc.view.getVisibleSize();
        var chunkIdY = parseInt(characterPos.y / this.world.getChunkHeight());
        var endX = this.world.chunks["endX-"+chunkIdY];
        var triggerX = endX - (visibleSize.width - parseInt(characterInitPos.x));

        if (parseInt(triggerX) <= parseInt(characterPos.x) && this.firstTime){
           // cc.director.pause();
            //copy here.
            this.firstTime = false;
            var loopX = this.world.chunks["loopX-"+chunkIdY];
            var minPos = cc.p(loopX, characterPos.y);
            var maxPos = cc.p(minPos.x + visibleSize.width, minPos.y);
            var chunkIdsNeedToCopy = this.world.getChunkIdsByRange(minPos, maxPos);
            for (var i=0; i<chunkIdsNeedToCopy.length;i++){
                var chunkId = chunkIdsNeedToCopy[i];
                this.copyChunkData(minPos.x, maxPos.x, endX, chunkId);
            }
        }
    },
    copyChunkData:function (minX, maxX, endX, chunkId) {
        var chunkData = this.world.getChunkDataById(chunkId);
        var objectTypeIds = this.world.getObjectTypeIdsInChunk(chunkId);
        var i, j;
        for (i=0; i<objectTypeIds.length; i++){
            var objectTypeId = objectTypeIds[i];
            for (j=0; j<chunkData[objectTypeId].length; j++){
                var objectData = chunkData[objectTypeId][j];
                if (objectData.x < maxX && objectData.x >= minX){
                    var copyObjectData = {};
                    copyObjectData.x = objectData.x + endX;
                    copyObjectData.y = objectData.y;
                    this.pasteObjectToRightChunk(copyObjectData, objectTypeId);
                }
            }
        }
    },
    pasteObjectToRightChunk:function (copyObjectData, objectTypeId) {
        var chunkId = parseInt(copyObjectData.x/this.world.getChunkWidth())
            + '-' + parseInt(copyObjectData.y/this.world.getChunkHeight());
        if (!this.world.chunks.hasOwnProperty(chunkId)){
            this.world.chunks[chunkId] = {};
            this.world.chunks[chunkId]['data'] = {};
        }
        var chunkData = this.world.getChunkDataById(chunkId);
        if (!chunkData.hasOwnProperty(objectTypeId)){
            chunkData[objectTypeId] = [];
        }
        chunkData[objectTypeId].push(copyObjectData);
    }
});