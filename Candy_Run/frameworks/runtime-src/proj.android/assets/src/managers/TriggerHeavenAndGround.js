/**
 * Created by SinhBlack on 1/7/2017.
 */
var TriggerHeavenAndGround = Trigger.extend({
    isInHeaven:false,
    initCharacterPosInHeaven:null,
    rememberedPosInGround:null,
    initCharacterPosInGround:null,
    isTriggerHeaven:false,
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
            this.rememberedPosInGround = cc.p(characterPos.x - 500, cc.view.getVisibleSize().height - 10);
        }

        var distanceY = Math.abs(characterPos.y - currentCameraY);
        if (distanceY >= cc.view.getVisibleSize().height/2 && characterPos.y >= globals.GROUND_HEIGHT){
            this.isTriggerHeaven = false;
            cc.log("INSIDE IF TAM LINH");
            this.world.releaseAllCurrentRenderedObjects();
            this.world.setIsNeedToInitVisibleChunks(true);
            //release ojects and teleport player here.
            if (this.isInHeaven){
                this.world.character.setPosition(this.rememberedPosInGround);
            }else{
                this.world.character.setPosition(this.initCharacterPosInHeaven);
            }
            this.world.graphicsParent.updateCamera(this.world.character);
            this.isInHeaven = !this.isInHeaven;
            return true;
        }
        return false;
    }
});