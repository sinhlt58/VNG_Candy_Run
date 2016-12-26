var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json : "res/MainScene.json",
    ground_plist : "res/ground.plist",
    ground_png : "res/ground.png",
    obstacles_plist : "res/obstacles.plist",
    obstacles_png : "res/obstacles.png",
    jelly_and_items_plist : "res/jelly_and_items.plist",
    jelly_and_items_png : "res/jelly_and_items.png",
    princess_atlas : "res/princess/princess.atlas",
    princess_json : "res/princess/princess.json",
    princess_png : "res/princess/char7.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
