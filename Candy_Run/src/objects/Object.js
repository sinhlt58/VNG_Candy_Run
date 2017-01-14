/**
 * Created by SinhBlack on 12/30/2016.
 */
var ObjectGame = cc.Class.extend({
    objectTypeId:null,
    sprite:null,
    ctor:function (sprite) {
        this.sprite = sprite;
    },
    getObjectTypeId:function () {
        return this.objectTypeId;
    },
    setObjectTypeId:function (objectTypeId) {
        this.objectTypeId = objectTypeId;
    },
    update:function (dt, world) {
        var objectData = this.sprite.getUserData();
        var size = this.sprite.getContentSize();
        if (!world.isObjectInsideTheScreen(this.sprite.getPosition(), this.sprite.getContentSize())){
            world.releaseAObjectData(this.sprite.getUserData());
        }
    }
});