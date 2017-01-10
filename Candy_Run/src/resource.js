var res = {
    princess_atlas: "res/assets/characters/princess/princess.atlas",
    princess_json: "res/assets/characters/princess/princess.json",
    princess_png: "res/assets/characters/princess/char7.png",



    zombie_atlas: "res/assets/characters/zombie/zombie.atlas",
    zombie_json: "res/assets/characters/zombie/zombie.json",
    zombie_png: "res/assets/characters/zombie/char12.png",



    ground_png: "res/ground.png",
    ground_plist: "res/ground.plist",
    jelly_and_items_plist: "res/jelly_and_items.plist",
    jelly_and_items_png: "res/jelly_and_items.png",
    obstacles_png: "res/obstacles.png",
    obstacles_plist: "res/obstacles.plist",

    chunks_json: "res/data/chunks.json",
    class_types: "res/data/class_types.json",
    item_effect_types: "res/data/item_effect_types.json",
    object_types: "res/data/object_types.json",


    layer_status_play_png: "res/assets/gui/scene_play/in_game/layer_status_play.png",
    layer_status_play_plist: "res/assets/gui/scene_play/in_game/layer_status_play.plist",


    test_background2_png: "res/assets/gui/scene_play/background/tm02_bg2.png",
    test_background1_png: "res/assets/gui/scene_play/background/tm02_bg1.jpg",
    test_button: "res/assets/gui/scene_lobby/gui_main/play.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}