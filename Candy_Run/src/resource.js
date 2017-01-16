var res = {
    princess_atlas: "res/assets/characters/princess/princess.atlas",
    princess_json: "res/assets/characters/princess/princess.json",
    princess_png: "res/assets/characters/princess/char7.png",


    zombie_atlas: "res/assets/characters/zombie/zombie.atlas",
    zombie_json: "res/assets/characters/zombie/zombie.json",
    zombie_png: "res/assets/characters/zombie/char12.png",


    chunks_json: "res/data/chunks.json",
    class_types: "res/data/class_types.json",
    item_effect_types: "res/data/item_effect_types.json",
    object_types: "res/data/object_types.json",
    characters_json: "res/data/characters.json",
    pets_json: "res/data/pets.json",
    gui_end_game_json: "res/assets/gui/scene_play/end_game/gui_end_game.json",
    gui_in_game_json: "res/assets/gui/scene_play/in_game/gui_in_game.json",


    test_background2_png: "res/assets/gui/scene_play/background/tm02_bg2.png",
    test_background1_png: "res/assets/gui/scene_play/background/tm02_bg1.jpg",
    test_button: "res/assets/gui/scene_lobby/gui_main/play.png",
    main_lobby_plist: "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.plist",
    main_lobby_png: "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.png",

    levels_json: "res/data/levels.json"
};

var sprite_sheets_play = [
    "res/ground.plist",
    "res/ground.png",
    "res/jelly_and_items.plist",
    "res/jelly_and_items.png",
    "res/obstacles.plist",
    "res/obstacles.png",

    "res/assets/gui/scene_play/in_game/layer_status_play.plist",
    "res/assets/gui/scene_play/in_game/layer_status_play.png",

    "res/assets/gui/characters/gui_characters.plist",
    "res/assets/gui/characters/gui_characters.png",
    "res/assets/gui/pets/gui_pets.plist",
    "res/assets/gui/pets/gui_pets.png",
    "res/assets/gui/scene_play/end_game/gui_end_game.plist",
    "res/assets/gui/scene_play/end_game/gui_end_game.png",
    // "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.plist",
    // "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.png",

    "res/assets/pets/pet_zombie.plist",
    "res/assets/pets/pet_zombie.png",
    "res/assets/pets/pet_cookie.plist",
    "res/assets/pets/pet_cookie.png"
];



var sprite_sheets_background = [
    "res/assets/gui/backgrounds/background_map_1_2.plist",
    "res/assets/gui/backgrounds/background_map_1_2.png",
    "res/assets/gui/backgrounds/background_map_3_4.plist",
    "res/assets/gui/backgrounds/background_map_3_4.png",
    "res/assets/gui/backgrounds/background_map_5_6.plist",
    "res/assets/gui/backgrounds/background_map_5_6.png",
    "res/assets/gui/backgrounds/background_map_83_84.plist",
    "res/assets/gui/backgrounds/background_map_83_84.png"
];



var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i = 0; i < sprite_sheets_play.length; i++) {
    g_resources.push(sprite_sheets_play[i]);
}


for (i=0; i<sprite_sheets_background.length; i++){
    g_resources.push(sprite_sheets_background[i]);
}

