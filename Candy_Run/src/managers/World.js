/**
 * Created by SinhBlack on 12/30/2016.
 */
var World = cc.Class.extend({
    chunks: null,
    ctor:function (chunkData) {
        this.chunks = chunkData;
    }
});