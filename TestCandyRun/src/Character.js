/**
 * Created by Fresher on 12/26/2016.
 */


var Character = cc.Class.extend({



    spAnimation: null,
    sprite: null,

    velocity: null,

    acceleration: null,


    grounded: null,


    currentAnimation: '',

    /*jumpingAction:null,
    movingAction:null,*/
    ctor: function () {
        this.spAnimation = new sp.SkeletonAnimation(res.princess_json, res.princess_atlas);
        this.sprite = new cc.Sprite();
        this.spAnimation.setPosition(cc.p(200, 200));

        this.currentAnimation='run1';
        this.spAnimation.setAnimation(0, this.currentAnimation, true);
        this.spAnimation.anchorX = 0.5;
        this.spAnimation.anchorY = 0.5;


        //this.spAnimation.
        //console.log(this.spAnimation.getAnchor());
        //console.log(this.sprite);
        this.sprite.setPosition(cc.p(200, 200));

        /*this.jumpingAction = new cc.JumpBy(0.54, cc.p(0, 0), 100, 1);
        var moveBy = new cc.MoveBy(2, cc.p(500, 0));
        this.movingAction = new cc.RepeatForever(moveBy);
        this.sprite.runAction(this.movingAction);*/

       // console.log(this.spAnimation);
        //
        // console.log(cc.p(1,2).add(cc.p(1,2)));
        console.log(this.spAnimation.getPosition());



        this.grounded=true;

        this.velocity= {
            x: 0,
            y: 0,
        };
        this.acceleration= {
            x: 0,
            y:-980.0,
        }
    },

    jump: function () {
        var tmpVelocity=this.velocity;
        this.grounded=false;
        tmpVelocity.y=500;
        var tmpPos= this.spAnimation.getPosition();

        //fix logic jump
        this.currentAnimation= 'jump';
        this.spAnimation.setAnimation(0,this.currentAnimation , false);
        this.spAnimation.setPosition(cc.p(tmpPos.x, tmpPos.y+1));

    },
    update:function (dt) {

        var tmpPos= this.spAnimation.getPosition();

        //ensure that Character never below ground and update acceleration
        if(tmpPos.y<=200){

            this.grounded=true;
            tmpPos.y=200;
            this.acceleration.y=0;
            if(this.currentAnimation!='run1'){
                this.currentAnimation='run1';
                this.spAnimation.setAnimation(0, this.currentAnimation, true);
            }
            //this.spAnimation.setAnimation(0, 'run1', true);

            //this.velocity.y=0;
        }else{
            this.acceleration.y=-980;
            //this.grounded=false;
        }

        if (this.grounded){
            this.velocity.y=0;
        }

        //update velocity
        this.velocity.x+=this.acceleration.x*dt;
        this.velocity.y+=this.acceleration.y*dt;

        //update position
        tmpPos.x+=this.velocity.x*dt;
        tmpPos.y+=this.velocity.y*dt;


        //console.log(tmpPos);



        this.spAnimation.setPosition(tmpPos);
    }
});