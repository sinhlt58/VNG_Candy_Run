/**
 * Created by SinhBlack on 1/16/2017.
 */
var LayerPlayBackground2 = LayerPlayBackground.extend({
    ctor:function () {
        var data = {
            "1" : {
                "map_name" : "tm01_bg1.png"
            },
            "2" : {
                "map_name" : "tm02_bg1.png"
            },
            "3" : {
                "map_name" : "tm03_bg1.png"
            },
            "4" : {
                "map_name" : "tm04_bg1.png"
            },
            "5" : {
                "map_name" : "tm05_bg1.png"
            },
            "6" : {
                "map_name" : "tm06_bg1.png"
            },
            "83" : {
                "map_name" : "tm83_bg1.png"
            },
            "84" : {
                "map_name" : "tm84_bg1.png"
            }
        };
        this._super(data);

        this.scheduleUpdate();
    },
    update:function (dt) {
        if (this.currentBackgroundLevel != cr.level_manager.getCurrentLevelIn()){
            this.changeBackground(cr.level_manager.getCurrentLevelIn());
        }

        this.runBackground(this.currentBackgroundLevel, 0.1, dt);
    }
});