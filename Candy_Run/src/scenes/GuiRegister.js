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
            var xRatio = guiObjectData["x"]/width;
            var yRatio = guiObjectData["y"]/height;
            if(guiType == globals.GUI_TYPE_STATIC){
                guiObject = new cc.Sprite("#" + guiObjectData["texture"]);
                guiObject.setPosition(xRatio*visibleSize.width, yRatio*visibleSize.height);
            }else if(guiType == globals.GUI_TYPE_BUTTON){
                var textures = guiObjectData["textures"];
                guiObject = new ccui.Button(textures[0], textures[1], textures[2], ccui.Widget.PLIST_TEXTURE);
                graphicsParent[guiObjectData["name"]] = guiObject;
                guiObject.setPosition(xRatio*visibleSize.width, yRatio*visibleSize.height);
                guiObject.addTouchEventListener(graphicsParent.handleButtonEvents, graphicsParent);
            }else if (guiType == globals.GUI_TYPE_PROCESS){
                guiObject = new cc.Sprite("#" + guiObjectData["texture"]);
                guiObject.setPosition(xRatio*visibleSize.width, yRatio*visibleSize.height);
                var currentPos = guiObject.getPosition();
                guiObject.setAnchorPoint(cc.p(0, 0));
                var size = guiObject.getContentSize();
                guiObject.setPosition(currentPos.x - size.width/2, currentPos.y - size.height/2);
                graphicsParent[guiObjectData["name"]] = guiObject;
            }


            graphicsParent.addChild(guiObject);
        }
    }
};