/**
 * Created by SinhBlack on 12/30/2016.
 */
var World = cc.Class.extend({
    chunks: null,
    factory:null,
    graphicsParent:null,
    ctor:function (chunkData, factory, graphicsParent) {
        this.chunks = chunkData;
        this.factory = factory;
        this.graphicsParent = graphicsParent;

        this.init();
    },
    init:function () {
        this.initObjectsInFullyVisibleChunks(0);
        this.initObjectsInFullyVisibleChunks(1);
        this.initObjectsInFullyVisibleChunks(2);
        this.initObjectsInFullyVisibleChunks(3);
    },

    initObjectsInFullyVisibleChunks:function (chunkIds) {

        var visibleSize = cc.view.getVisibleSize();
        var visibleOrgin = cc.view.getVisibleOrigin();

        var chunkData = this.getChunkDataById(chunkIds);
        console.log("w 25");
        var objectTypeIds = this.getObjectTypeIdsInChunk(chunkIds);

        console.log(chunkData);
        console.log(objectTypeIds);

        var i, j;
        for (i=0; i<objectTypeIds.length; i++){
            console.log(i + " " + objectTypeIds[i]);
            var objectTypeData = this.factory.getObjectTypeData(objectTypeIds[i]);

           // var classType = this.factory.getClassTypeByObjecType(objectTypeIds[i]);
            for (j=0; j<chunkData[objectTypeIds[i]].length; j++){
                var object = this.factory.getAObjectByObjectTypeId(objectTypeIds[i]);
                object.sprite.setAnchorPoint(cc.p(0, 0));
                var pos = chunkData[objectTypeIds[i]][j];
                object.sprite.setPosition(pos);

                this.graphicsParent.addChild(object.sprite);
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
        return this.chunks[chunkId]['data'];
    }
});