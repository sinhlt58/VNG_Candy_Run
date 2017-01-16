/**
 * Created by SinhBlack on 1/16/2017.
 */
cr.level_manager = {
    levelsData:null,
    world:null,

    init:function (data, world) {
      this.levelsData = data;
      this.world = world;
    },

    getLevelByPosition : function (pos) {
        for (var i=0; i<this.levelsData.length; i++){
            var level = this.levelsData[i];
            if (level["minX"] <= pos.x && pos.x <= level["maxX"] &&
                level["minY"] <= pos.y && pos.y <= level["maxY"]){
                return level["level"];
            }
        }
        return 1;
    },

    getCurrentLevelIn:function () {
        return this.world.currentLevelIn;
    }
};