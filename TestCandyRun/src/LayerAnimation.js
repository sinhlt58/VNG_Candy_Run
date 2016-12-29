/**
 * Created by SinhBlack on 12/25/2016.
 */
var LayerAnimation = cc.Layer.extend({
    character :null,
    chunks:null,

    ctor:function () {


        this._super();
        this.character = new Character();
        this.addChild(this.character.spAnimation);
        this.addChild(this.character.sprite);

        var moveBy = new cc.MoveBy(2, cc.p(500, 500));
        var jumpBy = new cc.JumpBy(0.54, cc.p(0, 0), 100, 1);
        var spawn = new cc.Spawn(moveBy, jumpBy);
       // this.character.sprite.runAction(spawn)

        var chunks = {};
        var self = this;


        // test chunk = gg();


        // .then (function(data){fjfjn})
        var testChunks = cc.loader.loadJson(res.new_chunks_json, function (error, data) {


            // async task
            if (!error){
                for (propoty in data[0]["data"]){
                    console.log(propoty);
                   for (var i= 0 ; i < data[0]["data"][propoty].length; i++){
                       data[0]["data"][propoty][i]["status"] = 0;
                   }
                }
                self.chunks = data;
            }

        });

        //

        this.scheduleUpdate();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    update:function (dt) {
        this.character.update(dt);
    },
    onTouchBegan:function(touch, event){
        var  layer = event.getCurrentTarget();
        layer.character.sprite.stopAllActions();
        layer.character.sprite.runAction(layer.character.jumpingAction);
        return true;
    },
    onTouchMoved:function(touch, event){

    },
    onTouchEnded:function (touch, event) {

    }
});