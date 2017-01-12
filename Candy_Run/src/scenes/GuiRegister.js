/**
 * Created by Fresher on 1/12/2017.
 */
cr.gui_register = {
    registerGui : function (data, graphicsParent) {
        var width = data["width"];
        var height = data["height"];
        var visibleSize = cc.view.getVisibleSize();

        for (var i=0; i<data["data"].length; i++){
            var guiObjectData = data["data"][i];
            var guiType = guiObjectData["gui_type"];
            var guiObject;
            if(guiType == globals.GUI_TYPE_STATIC){
                guiObject = new cc.Sprite("#" + guiObjectData["texture"]);
            }else if(guiType == globals.GUI_TYPE_BUTTON){
                var textures = guiObjectData["textures"];
                guiObject = new ccui.Button(textures[0], textures[1], textures[2], ccui.Widget.PLIST_TEXTURE);
                graphicsParent[guiObjectData["name"]] = guiObject;
                guiObject.addTouchEventListener(graphicsParent.handleButtonEvents, graphicsParent);
            }
            var xRatio = guiObjectData["x"]/width;
            var yRatio = guiObjectData["y"]/height;
            guiObject.setPosition(xRatio*visibleSize.width, yRatio*visibleSize.height);
            graphicsParent.addChild(guiObject);
        }
    }
};