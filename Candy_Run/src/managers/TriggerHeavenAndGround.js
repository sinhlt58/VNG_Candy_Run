/**
 * Created by SinhBlack on 1/7/2017.
 */
var TriggerHeavenAndGround = Trigger.extend({
    isInHeaven:false,
    initCharacterPosInHeaven:null,
    rememberedPosInGround:null,
    initCharacterPosInGround:null,
    isTriggerHeaven:false,

    tmpChunkIdX: -1000,
    tmpChunkIdY: 0,
    tmpChunkPosBackToGround: null,
    groundChunkPosBackFromTmp:null,
    isInTmpChunks:false,

    sourceChunkIdsFromTmp:null,
    desChunkIdsFromGroud:null,
    deltaXFromTmpToGround:null,
    deltaYFromTmpToGround:null,
    ctor:function (world) {
        this._super(world);

        this.initCharacterPosInGround = this.world.character.getInitPosition();
        this.initCharacterPosInHeaven = cc.p(this.initCharacterPosInGround.x,
                    2*this.world.getChunkHeight() - cc.view.getVisibleSize().height/2);
    },
    update:function(dt){
        //check if the character's pos go to heaven.
        var currentCameraY = this.world.graphicsParent.getCurrentCameraY();
        var characterPos = this.world.character.getPosition();

        if(!this.isInHeaven){
            this.rememberedPosInGround = cc.p(characterPos.x, cc.view.getVisibleSize().height - 10);
        }

        if (this.isInTmpChunks){
            if (characterPos.x >= this.tmpChunkPosBackToGround.x){
                //change later for exact
                var posFromTmpToGround = cc.p(characterPos.x + this.deltaXFromTmpToGround,
                    characterPos.y + this.deltaYFromTmpToGround);
                this.world.character.setPosition(posFromTmpToGround);
                Camera.update(this.world.character.getPosition(), this.world.character.getInitPosition(), cc.view.getVisibleSize());
                //teleport all the objects in the tmpChunks to the ground.

                //this.world.releaseAllCurrentRenderedObjects();
                //this.world.setIsNeedToInitVisibleChunks(true);
                this.copyStateChunksFromOtherChunks(this.sourceChunkIdsFromTmp, this.desChunkIdsFromGroud,
                    this.deltaXFromTmpToGround, this.deltaYFromTmpToGround);
                this.isInTmpChunks = false;
            }
        }

        var distanceY = Math.abs(characterPos.y - currentCameraY);
        if (distanceY >= cc.view.getVisibleSize().height/2 && characterPos.y >= globals.GROUND_HEIGHT
            && !this.isInTmpChunks){
            this.isTriggerHeaven = false;
            cc.log("INSIDE IF TAM LINH");
            this.world.releaseAllCurrentRenderedObjects();
            this.world.setIsNeedToInitVisibleChunks(true);
            //release ojects and teleport player here.
            if (this.isInHeaven){
                cc.audioEngine.playMusic(res.music_main_bgm_ogg, true);
                this.createTmpChunks(this.world.character.getInitPosition());
                this.world.character.setPosition(cc.p(250 + this.tmpChunkIdX*this.world.getChunkWidth(), 90));
                this.isInHeaven = !this.isInHeaven;
                // this.world.character.setPosition(this.rememberedPosInGround);
            }else{
                this.world.character.setPosition(this.initCharacterPosInHeaven);
                this.isInHeaven = !this.isInHeaven;
                cc.audioEngine.playMusic(res.music_fever_ogg, true);
            }
           // this.world.graphicsParent.updateCamera(this.world.character);
            Camera.update(this.world.character.getPosition(), this.world.character.getInitPosition(), cc.view.getVisibleSize());

            return true;
        }
        return false;
    },
    getChunkIdsToGetCopyedGround:function (characterPos) {
        var currentChunkIdX = parseInt(characterPos.x / this.world.getChunkWidth());
        var currentChunkIdY = parseInt(characterPos.y / this.world.getChunkHeight());
        var chunkIdsToGetCopyedGround = [];
        chunkIdsToGetCopyedGround.push(currentChunkIdX + 1 + '-' + currentChunkIdY);
        chunkIdsToGetCopyedGround.push(currentChunkIdX + 2 + '-' + currentChunkIdY);
        chunkIdsToGetCopyedGround.push(currentChunkIdX + 3 + '-' + currentChunkIdY);
        return chunkIdsToGetCopyedGround;
    },

    getCopyedGroundObjectTypeId:function (characterPos) {
        var chunkIdsToGetCopyedGround = this.getChunkIdsToGetCopyedGround(characterPos);
        var groundObjectTypeId = null;
        var objectTypeIds = this.world.getObjectTypeIdsInChunks(chunkIdsToGetCopyedGround);
        for (var i=0; i<objectTypeIds.length; i++){
            var classType = this.world.factory.getClassTypeByObjecType(objectTypeIds[i]);
            if (classType == globals.CLASS_TYPE_GROUND){
                groundObjectTypeId = objectTypeIds[i];
                return groundObjectTypeId;
            }
        }
        return groundObjectTypeId;
    },

    createTmpChunks:function (characterInitPos) {
        var startTmpChunkIdX = this.tmpChunkIdX;
        var numChunksNeedToCopy = this.calculateNumChunksNeedToCopy();
        var numOfCopy = 2;
        var copyedGroundObjectTypeId = this.getCopyedGroundObjectTypeId(this.rememberedPosInGround);
        if (copyedGroundObjectTypeId == null)
            copyedGroundObjectTypeId = 23;

        var groundY = this.tmpChunkIdY * this.world.getChunkHeight();

        var sourceChunkIds = [];
        var desChunkIds = [];

        var startSourceChunkIdX = parseInt(this.rememberedPosInGround.x / this.world.getChunkWidth()) + 1;
        var startSourceChunkIdY = parseInt(this.rememberedPosInGround.y / this.world.getChunkHeight());
        var startDesChunkIdX = numChunksNeedToCopy*numOfCopy + this.tmpChunkIdX;

        var deltaX = (startDesChunkIdX - startSourceChunkIdX)*this.world.getChunkWidth();
        var deltaY = (this.tmpChunkIdY - startSourceChunkIdY)*this.world.getChunkHeight();
        this.deltaXFromTmpToGround = -deltaX;
        this.deltaYFromTmpToGround = -deltaY;

        //create ground for tmpchunks
        for (var i=0; i<numChunksNeedToCopy*numOfCopy; i++){
            var tmpChunkIdX = startTmpChunkIdX + i;

            var tmpChunkId = tmpChunkIdX + '-' + this.tmpChunkIdY;
            this.world.chunks[tmpChunkId] = {};
            this.world.chunks[tmpChunkId]["data"] = {};
            this.world.chunks[tmpChunkId]["data"][copyedGroundObjectTypeId] = [];
            for (var j=0; j<globals.NUM_OF_GROUND_PER_CHUNK; j++){
                var groundX = tmpChunkIdX * this.world.getChunkWidth() + j*globals.GROUND_WIDTH;
                var objectData = {x: groundX, y: groundY};
                this.world.chunks[tmpChunkId]["data"][copyedGroundObjectTypeId].push(objectData);
            }
            if (i < numChunksNeedToCopy){
                var sourceChunkIdX= startSourceChunkIdX + i;
                var desChunkIdx = startDesChunkIdX + i;

                sourceChunkIds.push(sourceChunkIdX + '-' + startSourceChunkIdY);
                desChunkIds.push(desChunkIdx + '-' + this.tmpChunkIdY);
            }
        }

        //copy chunks in the rememberedPos
        this.createChunksFromOtherChunks(sourceChunkIds, desChunkIds, deltaX, deltaY);

        //setTmpPosBackToGround
        var tmpPosBackToGroundX = startDesChunkIdX*this.world.getChunkWidth() + characterInitPos.x;
        var tmpPosBackToGroundY = this.world.character.getPosition().y - deltaY;
        this.tmpChunkPosBackToGround = cc.p(tmpPosBackToGroundX, tmpPosBackToGroundY);
        this.isInTmpChunks = true;

        var groundChunkPosBackFromTmpX = startSourceChunkIdX*this.world.getChunkWidth() + characterInitPos.x;
        var groundChunkPosBackFromTmpY = globals.GROUND_HEIGHT;
        this.groundChunkPosBackFromTmp = cc.p(groundChunkPosBackFromTmpX, groundChunkPosBackFromTmpY);

        //prepare for teleport back to ground
        this.sourceChunkIdsFromTmp = desChunkIds;
        this.desChunkIdsFromGroud = sourceChunkIds;
    },
    calculateNumChunksNeedToCopy:function () {
        var numChunksNeedToCopy;
        var visibleSize = cc.view.getVisibleSize();
        if (visibleSize.width % this.world.getChunkWidth() == 0){
            numChunksNeedToCopy = parseInt(visibleSize.width / this.world.getChunkWidth());
        }else{
            numChunksNeedToCopy = parseInt(visibleSize.width / this.world.getChunkWidth()) + 1;
        }
        return numChunksNeedToCopy;
    },
    createChunksFromOtherChunks:function (sourceChunkIds, desChunkIds, deltaX, deltaY) {
        for (var i=0; i<desChunkIds.length; i++){
            this.world.chunks[desChunkIds[i]] = {};
            this.world.chunks[desChunkIds[i]]["data"] = {};
            var objectTypeIds = this.world.getObjectTypeIdsInChunk(sourceChunkIds[i]);
            for (var j=0; j<objectTypeIds.length; j++){
                this.world.chunks[desChunkIds[i]]["data"][objectTypeIds[j]] = [];
                var sourceObjectsData = this.world.chunks[sourceChunkIds[i]]["data"][objectTypeIds[j]];
                for (var t=0; t<sourceObjectsData.length; t++){
                    var x = sourceObjectsData[t].x + deltaX;
                    var y = sourceObjectsData[t].y + deltaY;
                    var newObjectData = {x: x, y: y};
                    this.world.chunks[desChunkIds[i]]["data"][objectTypeIds[j]].push(newObjectData);
                }
            }
        }
    },
    copyStateChunksFromOtherChunks:function (sourceChunkIds, desChunkIds, deltaX, deltaY) {
        for (var i=0; i<desChunkIds.length; i++){
            this.world.chunks[desChunkIds[i]] = {};
            this.world.chunks[desChunkIds[i]]["data"] = {};
            var objectTypeIds = this.world.getObjectTypeIdsInChunk(sourceChunkIds[i]);
            for (var j=0; j<objectTypeIds.length; j++){
                this.world.chunks[desChunkIds[i]]["data"][objectTypeIds[j]] = [];
                var sourceObjectsData = this.world.chunks[sourceChunkIds[i]]["data"][objectTypeIds[j]];
                for (var t=0; t<sourceObjectsData.length; t++){
                    var x = sourceObjectsData[t].x + deltaX;
                    var y = sourceObjectsData[t].y + deltaY;
                    var newObjectData = {x: x, y: y};
                    this.world.chunks[desChunkIds[i]]["data"][objectTypeIds[j]].push(newObjectData);
                    if (sourceObjectsData[t].hasOwnProperty("pObject") && sourceObjectsData[t]["pObject"] != null){
                        var pSourceObject = sourceObjectsData[t]["pObject"];
                        var pObjectSourcePos = pSourceObject.sprite.getPosition();
                        //teleport current sprite
                        if(pSourceObject.sprite == null){
                            var a = 1;
                        }
                        pSourceObject.sprite.setPosition(pObjectSourcePos.x + deltaX, pObjectSourcePos.y + deltaY);
                        //swap that sprite for the desChunks
                        newObjectData["pObject"] = pSourceObject;
                        sourceObjectsData[t]["pObject"] = null;
                        //check if is obstacle then reset state
                        //not needed because the action moveTo of cc implement from moveBy
                        //var classType = this.world.factory.getClassTypeByObjecType(objectTypeIds[j]);
                        // if (classType == globals.CLASS_TYPE_OBSTACLE){
                        //     newObjectData["pObject"]
                        //         .stateMachineObstacle.stateObstacle.onEnter(newObjectData["pObject"]);
                        // }
                    }
                }
            }
        }
    }
});