/**
 * Created by Fresher on 1/12/2017.
 */
var LayerPlayEnd = cc.Layer.extend({
    buttonBackToLobby:null,
    ctor:function (data) {
        this._super();
        cr.gui_register.registerGui(data, this);
    },
    handleButtonEvents:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED){
            if (sender == this.buttonBackToLobby){
                cc.director.popScene();
            }
        }
    }
});