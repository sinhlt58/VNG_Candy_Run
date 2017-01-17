/**
 * Created by Fresher on 1/17/2017.
 */
cr.sound_manager = {
    data:null,
    init:function (data) {
        if (this.data == null)
            this.data = data;
    },
    getSoundUrlById:function (id) {
        if (this.data.hasOwnProperty(id))
            return this.data[id];
        return null;
    }
};