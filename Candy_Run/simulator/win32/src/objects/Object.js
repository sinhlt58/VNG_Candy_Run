/**
 * Created by SinhBlack on 12/30/2016.
 */
var ObjectGame = cc.Class.extend({
    objectTypeId:null,
    sprite:null,
    ctor:function () {

    },
    getObjectTypeId:function () {
        return this.objectTypeId;
    },
    setObjectTypeId:function (objectTypeId) {
        this.objectTypeId = objectTypeId;
    }
});