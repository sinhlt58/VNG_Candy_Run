/**
 * Created by SinhBlack on 1/2/2017.
 */
var TriggerBackToLoop = Trigger.extend({
    ctor:function (world) {
        this._super(world);
    },
    update:function (dt) {
        var characterPos = this.world.tempCharacter.getPosition();//todo: change later
        var characterInitPos = this.world.initPosCharacter;//todo: change later
        var visibleSize = cc.view.getVisibleSize();
        var chunkIdY = parseInt(characterPos.y / this.world.getChunkHeight());
        var endX = this.world.chunks["endX-"+chunkIdY];

        var triggerX = endX + characterInitPos.x;
        if (parseInt(characterPos.x) >= parseInt(triggerX)){
            var minPos = cc.p(endX, characterPos.y);
            var maxPos = cc.p(endX + visibleSize.width, characterPos.y);
            var loopX = this.world.chunks["loopX-"+chunkIdY];
            var chunkIdsNeedToTeleport = this.world.getChunkIdsByRange(minPos, maxPos);
            for (var i=0; i<chunkIdsNeedToTeleport.length; i++){
                var chunkId = chunkIdsNeedToTeleport[i];
                this.teleportChunk(minPos.x, maxPos.x, endX, loopX, chunkId);
            }
            //teleport character.
            //todo: change later
            this.world.tempCharacter.setPosition(cc.p(loopX + (characterPos.x-endX), characterPos.y));
            //change camera too.
            //todo: change later
            var cameraCurrentPos = this.world.graphicsParent.getPosition();
            this.world.graphicsParent.setPosition(cc.p(-(loopX + (characterPos.x-endX)), cameraCurrentPos.y));
        }
    },
    teleportChunk:function (minX, maxX, endX, loopX, chunkId) {
        var chunkData = this.world.getChunkDataById(chunkId);
        var objectTypeIds = this.world.getObjectTypeIdsInChunk(chunkId);
        var i, j;
        for (i=0; i<objectTypeIds.length; i++) {
            var objectTypeId = objectTypeIds[i];
            for (j=0; j<chunkData[objectTypeId].length; j++){
                var objectData = chunkData[objectTypeId][j];

                if (objectData.hasOwnProperty("pObject")
                  && minX <= objectData.x && objectData.x < maxX){
                    if (objectData["pObject"] != null){
                        //console.log("object data in teleport chunk: ", objectData["pObject"]);
                        this.teleportObject(endX, loopX, objectData, objectTypeId);
                    }
                }else{
                   // cc.log("object data has null pObject: ", objectData["pObject"]);
                }
            }
        }
        //cc.director.pause();
    },
    teleportObject:function (endX, loopX, objectData, objectTypeId) {
            var xTeleportTo = parseInt(objectData.x) - (parseInt(endX) - parseInt(loopX));
            var chunkIdTeleportTo = parseInt(xTeleportTo/this.world.getChunkWidth())
                + '-' + parseInt(objectData.y/this.world.getChunkHeight());

            var teleportTochunkData = this.world.getChunkDataById(chunkIdTeleportTo);

            for (var j=0; j<teleportTochunkData[objectTypeId].length; j++) {
                var teleportToObjectData = teleportTochunkData[objectTypeId][j];
                if (parseInt(teleportToObjectData.x) == parseInt(xTeleportTo) &&
                    parseInt(teleportToObjectData.y) == parseInt(objectData.y)){
                    var pObject = objectData["pObject"];
                    pObject.sprite.setPosition(cc.p(xTeleportTo, objectData.y)); //todo: may change to pObject.setPosition() only
                    teleportToObjectData["pObject"] = pObject;
                    objectData["pObject"] = null;
                    return ;
                }
            }
    }
});