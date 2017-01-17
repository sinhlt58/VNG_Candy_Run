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
    sound_json: "res/data/sound.json",


    test_background2_png: "res/assets/gui/scene_play/background/tm02_bg2.png",
    test_background1_png: "res/assets/gui/scene_play/background/tm02_bg1.jpg",
    test_button: "res/assets/gui/scene_lobby/gui_main/play.png",
    main_lobby_plist: "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.plist",
    main_lobby_png: "res/assets/gui/scene_lobby/gui_main/gui_main_lobby.png",


    character_lobby_plist:"res/assets/gui/scene_lobby/gui_characters/lobby_character_layer.plist",
    character_lobby_png:"res/assets/gui/scene_lobby/gui_characters/lobby_character_layer.png",


    levels_json: "res/data/levels.json",

    music_lobby_bgm_ogg : "res/assets/music/ogg/lobby_bgm.ogg",
    music_main_bgm_ogg : "res/assets/music/ogg/main_bgm.ogg",
    music_fever_ogg : "res/assets/music/ogg/fever.ogg",

    sound_character_jump_mp3: "res/assets/using_sound/char04_jump.mp3",
    sound_character_slide_mp3: "res/assets/using_sound/char04_slide.mp3",

    gui_pet_cookie: "res/assets/gui/scene_lobby/gui_pets/pet_cookie.png",
    gui_pet_zombie: "res/assets/gui/scene_lobby/gui_pets/pet_zombie.png",

    gui_x_button: "res/assets/gui/scene_lobby/x_button.png"

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
    "res/assets/pets/pet_cookie.png",

    "res/assets/effects/effect.plist",
    "res/assets/effects/effect.png"
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

var sound = [
    "res/assets/using_sound/char01_jump.mp3",
    "res/assets/using_sound/char01_slide.mp3",
    "res/assets/using_sound/char04_jump.mp3",
    "res/assets/using_sound/char04_slide.mp3",
    "res/assets/using_sound/char08_jump.mp3",
    "res/assets/using_sound/char08_slide.mp3",
    "res/assets/using_sound/g_alphabet.mp3",
    "res/assets/using_sound/g_bigbearjelly.mp3",
    "res/assets/using_sound/g_bigcoinjelly.mp3",
    "res/assets/using_sound/g_coin.mp3",
    "res/assets/using_sound/g_feverin.mp3",
    "res/assets/using_sound/g_giantland.mp3",
    "res/assets/using_sound/g_jelly.mp3",
    "res/assets/using_sound/i_giant.mp3",
    "res/assets/using_sound/i_invinsible.mp3",
    "res/assets/using_sound/i_large_enegry.mp3",
    "res/assets/using_sound/i_magnet.mp3",
    "res/assets/using_sound/i_small_enegry.mp3",
    "res/assets/using_sound/ut_result_fail2.mp3"
];


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (i = 0; i < sprite_sheets_play.length; i++) {
    g_resources.push(sprite_sheets_play[i]);
}


for (i=0; i<sprite_sheets_background.length; i++){
    g_resources.push(sprite_sheets_background[i]);
}

for (i=0; i<sound.length; i++){
    g_resources.push(sound[i]);
}

