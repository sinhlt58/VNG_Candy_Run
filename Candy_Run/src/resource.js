var res = {
    HelloWorld_png: "res/HelloWorld.png",
    MainScene_json: "res/MainScene.json",
    princess_atlas: "res/assets/characters/princess/princess.atlas",
    princess_json: "res/assets/characters/princess/princess.json",
    zombie_atlas: "res/assets/characters/zombie/zombie.atlas",
    zombie_json: "res/assets/characters/zombie/zombie.json",
    ground_png: "res/ground.png",
    ground_plist: "res/ground.plist",
    jelly_and_items_plist: "res/jelly_and_items.plist",
    jelly_and_items_png: "res/jelly_and_items.png",
    obstacles_png: "res/obstacles.png",
    obstacle_plist: "res/obstacles.plist"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
