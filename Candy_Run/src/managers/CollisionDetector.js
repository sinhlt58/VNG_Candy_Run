/**
 * Created by Fresher on 1/3/2017.
 */
var CollisionDetector = cc.Class.extend({
    world:null,
    collisionObjectsWithCharacter:[],
    ctor:function (world) {
        this.world = world;
    },
    update:function (dt) {
        //update array contains items, ground, obstacles collide with character.

        //handle collisions character with item objects.

    },
    handleCollision:function (character, collisionObjects) {
       // handle with character
        // handle with items
    }
});