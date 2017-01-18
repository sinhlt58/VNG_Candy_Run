/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayAnimation = cc.Layer.extend({
    world: null,
    factoryObject: null,
    character: null,
    pet:null,


    touching: null,

    ctor: function () {

        this.touching= false;
        this._super();
        this.init();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, e) {


                if(key==cc.KEY.h){

                    var character= e.getCurrentTarget().character;

                    character.stateMachine.changeState('stateMovement', new StateInHeaven());

                }

                if(key==cc.KEY.g){

                    // cc.log("G");
                    var character= e.getCurrentTarget().character;

                    if(character.stateMachine.stateGiant instanceof StateGiantActive){
                        character.stateMachine.changeState('stateGiant', new StateGiantDisactive());
                    }else{
                        character.stateMachine.changeState('stateGiant', new StateGiantActive());
                    }



                }

                if(key==cc.KEY.f){

                    //cc.log("F");

                    //fixme fix logic here, it is debug mode, remove later
                    var character= e.getCurrentTarget().character;

                    if(character.stateMachine.stateMovement instanceof StateRunning){
                        character.stateMachine.changeState('stateMovement', new StateFlying());
                    }else if(character.stateMachine.stateMovement instanceof StateFlying){
                        character.stateMachine.changeState("stateMovement",new StateRunning());
                    }



                }

                if (key == cc.KEY.space) {
                    //cc.log("Space is pressed");
                    var thisLayer = e.getCurrentTarget();
                    var character = thisLayer.character;

                    //only can slide when running
                    if (character.stateMachine.stateMovement instanceof StateRunning == true) {
                        character.stateMachine.changeState("stateMovement",new StateSliding());
                        //cc.log("Enter sliding");
                    } else {
                        //cc.log('Sliding');
                    }
                }

                //character.stateMachine.setStateMovement(new Sta)


                return true;
            },
            onKeyReleased: function (key, e) {

                if (key == cc.KEY.space) {
                    var character = e.getCurrentTarget().character;
                    if(character.stateMachine.stateMovement instanceof StateSliding){
                        character.stateMachine.changeState("stateMovement",new StateRunning());
                    }
                    cc.log("Space is released");
                    //cc.log("Exit sliding");
                }
                //cc.log()
            }
        }, this);


        this.scheduleUpdate();
    },
    init: function () {
        //add resource to frameCache
        // cc.spriteFrameCache.addSpriteFrames(res.ground_plist, res.ground_png);
        // cc.spriteFrameCache.addSpriteFrames(res.obstacles_plist, res.obstacles_png);
        // cc.spriteFrameCache.addSpriteFrames(res.jelly_and_items_plist, res.jelly_and_items_png);
        for (var i=0; i<sprite_sheets_play.length-1; i+=2){
            cc.spriteFrameCache.addSpriteFrames(sprite_sheets_play[i], sprite_sheets_play[i+1]);
        }

        //create object factory with data.
        this.factoryObject = new FactoryObject(cc.loader.getRes(res.class_types),
            cc.loader.getRes(res.item_effect_types), cc.loader.getRes(res.object_types),
            cc.loader.getRes(res.characters_json), cc.loader.getRes(res.pets_json));

        //create Character
        // this.character = new Character();
        // this.addChild(this.character.spAnimation);
        this.character = this.factoryObject.getCharacterById(cr.game.getPlayer().currentCharacterId, this);

        //create Pet
        this.pet = this.factoryObject.getPetById(cr.game.getPlayer().currentPetId, this, this.character);

        //run ini skills for character
        this.character.runSkillsInit();

        Camera.init(this);

        //create world with chunk data for world object.
        this.world = new World(cc.loader.getRes(res.chunks_json), this.factoryObject, this,
            this.character, this.pet);

        this.character.world = this.world;
    },
    update: function (dt) {
        //handle inputs.
        //update world accordingly to the character's pos.
        this.world.update(dt);

        cc.log(this.touching);


    },
    updateCamera: function (character) {//todo: change code later for pretty
        var visibleSize = cc.view.getVisibleSize();
        var characterPos = character.getPosition();
        var characterInitPos = character.getInitPosition();

        var changeX = characterPos.x - characterInitPos.x;
        var changeY = parseInt(((characterPos.y + character.getContentSize().height) / this.getCameraNeedToChangeY())) * this.getCameraNeedToChangeY();

        this.setPosition(-changeX, -changeY);
    },

    getCurrentCameraY: function () {
        return Math.abs(this.getPosition().y) + cc.view.getVisibleSize().height / 2;
    },

    getCameraNeedToChangeY: function () {
        return 2 * this.world.getChunkHeight() - cc.view.getVisibleSize().height;
    },

    onTouchBegan: function (touch, event) {
        //console.log('mouse down');

        var thisLayer= event.getCurrentTarget();

        thisLayer.touching=true;

        return true;
    },
    onTouchEnded: function (t, e) {

        var thisLayer = e.getCurrentTarget();

        if (thisLayer.character.stateMachine.stateMovement instanceof StateRunning) {
            thisLayer.character.stateMachine.changeState("stateMovement",new StateJumping());

        }
        // is jumping v1
        else if (thisLayer.character.stateMachine.stateMovement instanceof StateJumping) {
            thisLayer.character.stateMachine.changeState('stateMovement',new StateDoubleJumping());
        } else {
        }


        thisLayer.touching= false;
        return true;
    },
    onExit: function () {
        this._super();
        this.world.releaseAllCurrentRenderedObjects();
        cr.item_effect_manager.getItemEffectByType(globals.ITEM_EFFECT_LETTER).resetLetters();
    }
});