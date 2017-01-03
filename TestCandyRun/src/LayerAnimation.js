/**
 * Created by SinhBlack on 12/25/2016.
 */
var LayerAnimation = cc.Layer.extend({
    character :null,
    chunks:null,

    labelPos: null,
    labelAcc: null,
    labelVelo: null,


    ctor:function () {
        this._super();
        this.character = new Character();
        this.addChild(this.character.spAnimation);
        //this.addChild(this.character.sprite);

        /*var moveBy = new cc.MoveBy(2, cc.p(500, 500));
        var jumpBy = new cc.JumpBy(0.54, cc.p(0, 0), 100, 1);
        var spawn = new cc.Spawn(moveBy, jumpBy);*/
       // this.character.sprite.runAction(spawn)


        var winSize= cc.winSize;

        var chunks = {};
        var self = this;



        this.labelPos= new cc.LabelTTF("This is Position", "Helvetica");
        this.labelPos.setFontSize(15);
        this.labelPos.setAnchorPoint(cc.p(0, 0.5));
        this.labelPos.setPosition(20, winSize.height-50);
        this.addChild(this.labelPos);



        this.labelAcc= new cc.LabelTTF("This is a Acceleration", "Helvetica");
        this.labelAcc.setFontSize(15);
        this.labelAcc.setAnchorPoint(cc.p(0, 0.5));
        this.labelAcc.setPosition(20, winSize.height-70);
        this.addChild(this.labelAcc);



        this.labelVelo= new cc.LabelTTF("This is a Velocity", "Helvetica");
        this.labelVelo.setFontSize(15);
        this.labelVelo.setAnchorPoint(cc.p(0, 0.5));
        this.labelVelo.setPosition(20, winSize.height-90);
        this.labelVelo.setString("Velocity Change");
        this.addChild(this.labelVelo);



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

        //update Character
        this.character.update(dt);

        //debug
        this.labelPos.setString("Position "+this.character.spAnimation.getPosition().x+" "+this.character.spAnimation.getPosition().y)
        this.labelVelo.setString("Velo "+ this.character.velocity.x+ " "+ this.character.velocity.y);
        this.labelAcc.setString("Acc "+ this.character.acceleration.x+" "+this.character.acceleration.y);

    },

    //handle touch
    onTouchBegan:function(touch, event){





        //get current layer
        var  layer = event.getCurrentTarget();



        layer.character.jump();
        return true;
    },
    onTouchMoved:function(touch, event){

    },
    onTouchEnded:function (touch, event) {

    }
});