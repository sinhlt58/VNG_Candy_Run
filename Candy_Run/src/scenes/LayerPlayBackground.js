/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayBackground = cc.Layer.extend({
    levelMaps: null,
    currentBackgroundLevel: 1,

    currentBackground:null,
    backgroundSpeed:100,
    currentLevel:null,
    numOfBackgroundPerScreen:null,
    triggerXLoopMap:null,

    ctor:function (data) {
        this._super();

        this.levelMaps = data;

        var visibleSize = cc.view.getVisibleSize();
        //calculate number of background
        this.numOfBackgroundPerScreen = parseInt(visibleSize.width/globals.BACKGROUND_WIDTH) + 2;
        this.triggerXLoopMap = -(globals.BACKGROUND_WIDTH*this.numOfBackgroundPerScreen - visibleSize.width);
        this.currentBackgroundLevel = cr.level_manager.getCurrentLevelIn();
        this.setLocalZOrder(-1);
    },

    changeBackground:function (level) {
        this.fadeOutMapLevel(this.currentBackgroundLevel, 1);
        if (!this.levelMaps[level].hasOwnProperty("sprites")){
            this.initMapLevel(level);
        }
        this.resetPosition(level);
        this.fadeInMapLevel(level, 1);
        this.currentBackgroundLevel = level;
    },
    
    runBackground:function (level, factorWithCharacterSpeed, dt) {
        var characterVelocity = cr.game.getPlayer().pCurrentCharacter.getVelocity();
        var background;

        //create sprite if doesn't have
        if (!this.levelMaps[level].hasOwnProperty("sprites")){
            this.initMapLevel(level);
        }else{
            for (var i=0; i<this.numOfBackgroundPerScreen; i++){
                background =this.levelMaps[level]["sprites"][i];
                var currentPos = background.getPosition();
                background.setPosition(currentPos.x -
                    dt*characterVelocity.x*factorWithCharacterSpeed, currentPos.y);
            }
        }

        var backgrounds = this.levelMaps[level]["sprites"];
        if (backgrounds.length > 1){
            var frontBackground = backgrounds[0];
            var currentFrontPos = frontBackground.getPosition();
            if (currentFrontPos.x <= this.triggerXLoopMap){
                backgrounds.splice(0, 1);//pop the front
                frontBackground.setPosition(currentFrontPos.x +
                    this.numOfBackgroundPerScreen*globals.BACKGROUND_WIDTH
                    ,currentFrontPos.y);
                backgrounds.push(frontBackground);//push the front to back
            }
        }

    },

    initMapLevel:function (level) {
        var background;
        this.levelMaps[level]["sprites"] = [];
        for (var i=0; i<this.numOfBackgroundPerScreen; i++){
            background = new cc.Sprite("#" + this.levelMaps[level]["map_name"]);
            background.setAnchorPoint(cc.p(0, 0));
            var size = background.getContentSize();
            background.setScaleX(globals.BACKGROUND_WIDTH / size.width);
            background.setScaleY(globals.BACKGROUND_HEIGHT / size.height);
            background.setPosition(i*globals.BACKGROUND_WIDTH, 0);
            this.levelMaps[level]["sprites"].push(background);
            this.addChild(background);
        }
    },

    resetPosition:function (level) {
        var currentBackgrounds = this.levelMaps[level]["sprites"];
        for (var i=0; i < currentBackgrounds.length; i++){
            currentBackgrounds[i].setPosition(i*globals.BACKGROUND_WIDTH, 0);
        }
    },

    fadeInMapLevel:function (level, duration) {
        var currentBackgrounds = this.levelMaps[level]["sprites"];
        for (var i=0; i < currentBackgrounds.length; i++){
            var fadeInAction = new cc.FadeIn(duration);
            var sequence = new cc.Sequence(fadeInAction,
                new cc.CallFunc(this.setVisibleBackground, currentBackgrounds[i], true));
            currentBackgrounds[i].runAction(sequence);

        }
    },
    fadeOutMapLevel:function (level, duration) {
        var currentBackgrounds = this.levelMaps[level]["sprites"];
        for (var i=0; i < currentBackgrounds.length; i++){
            var fadeInAction = new cc.FadeOut(duration);
            var sequence = new cc.Sequence(fadeInAction,
                new cc.CallFunc(this.setVisibleBackground, currentBackgrounds[i], false));
            currentBackgrounds[i].runAction(sequence);

        }
    },

    setVisibleBackground:function (backgroundSprite, val) {
        this.setVisible(val);//this means backgrounds[i]
    }
});