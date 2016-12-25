/**
 * Created by SinhBlack on 12/25/2016.
 */
var Obstacle = cc.Class.extend({
    sprite:null,
    space:null,
    body:null,
    shape:null,
    ctor:function (parent, space, textureName) {
        this.sprite = new cc.PhysicsSprite(textureName);
        this.space = space;
        this.updateShapeByTexture();
        parent.addChild(this.sprite);
    },
    setNewTexture:function(frameName){
        var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
        this.sprite.setSpriteFrame(frame);
    },
    updateShapeByTexture:function () {
        var contentSize = this.sprite.getContentSize();
        if (this.shape != null){
            this.space.removeShape(this.shape);
            this.shape = null;
        }

        if (this.body == null){
            this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
            this.sprite.setBody(this.body);
        }

        this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
        this.space.addShape(this.shape);
    },
    changeByTexture:function (frameName) {
        var oldSize = this.sprite.getContentSize();
        this.setNewTexture(frameName);
        var newSize = this.sprite.getContentSize();
        if (newSize.width != oldSize.width || newSize.height != oldSize.height){
            this.updateShapeByTexture();
        }
    },
    removeFromParent:function () {
        this.sprite.removeFromParent();
        this.sprite = null;
        this.space.removeShape(this.shape);
        this.shape = null;
    }
});