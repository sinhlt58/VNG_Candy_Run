/**
 * Created by Fresher on 12/29/2016.
 */
var LayerPlayBackground = cc.Layer.extend({
    levelMaps: null,

    currentBackground:null,
    backgroundSpeed:100,
    currentLevel:null,
    numOfBackgroundPerScreen:null,

    ctor:function () {
        this._super();

        this.levelMaps = {
            "1" : {
                "map_name" : "tm01_bg2.png"
            },
            "2" : {
                "map_name" : "tm02_bg2.png"
            },
            "3" : {
                "map_name" : "tm03_bg2.png"
            },
            "4" : {
                "map_name" : "tm04_bg2.png"
            },
            "5" : {
                "map_name" : "tm05_bg2.png"
            },
            "6" : {
                "map_name" : "tm06_bg2.png"
            },
            "82" : {
                "map_name" : "tm82_bg2.png"
            },
            "83" : {
                "map_name" : "tm83_bg2.png"
            }
        };

        for (var i=0; i<sprite_sheets_background.length-1; i+=2){
            cc.spriteFrameCache.addSpriteFrames(sprite_sheets_background[i], sprite_sheets_background[i+1]);
        }

        var visibleSize = cc.view.getVisibleSize();
        //calculate number of background
        this.numOfBackgroundPerScreen = parseInt(visibleSize.width/globals.BACKGROUND_WIDTH) + 2;
        this.runBackground(1, 100, 2);

        this.scheduleUpdate()
    },
    
    update:function (dt) {
        
    },
    
    changeBackground:function (level) {
        
    },
    
    runBackground:function (level, speed, dt) {

        //create sprite if doesn't have
        if (!this.levelMaps[level].hasOwnProperty("sprites")){
            this.levelMaps[level]["sprites"] = [];
            for (var i=0; i<this.numOfBackgroundPerScreen; i++){
                var background = new cc.Sprite("#" + this.levelMaps[level]["map_name"]);
                background.setAnchorPoint(cc.p(0, 0));
                var size = background.getContentSize();
                background.setScaleX(globals.BACKGROUND_WIDTH / size.width);
                background.setScaleY(globals.BACKGROUND_HEIGHT / size.height);
                background.setPosition(i*globals.BACKGROUND_WIDTH, 0);
                this.levelMaps[level]["sprites"].push(background);
                this.addChild(background);
            }
        }else{
            for (i=0; i<this.numOfBackgroundPerScreen; i++){
               // this.levelMaps[level]["sprites"][i].setVisible(true);
            }
        }
    },
    onExit:function () {
        this._super();
    }
});