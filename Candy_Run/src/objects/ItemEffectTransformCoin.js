/**
 * Created by Fresher on 1/7/2017.
 */
var ItemEffectTransform = ItemEffect.extend({
    ctor:function () {
        this._super();
    },
    doEffect:function (game, world, item) {
        var jellies = world.getObjectItemsByTypeInRadius(world.character.getPosition(), 1000, globals.OBJECT_TYPE_JELLY);
        for (var i=0; i<jellies.length; i++){
            var replaceCoin = world.factory.getAObjectByObjectTypeId(globals.OBJECT_TYPE_BIG_COIN);
            var jellyPos = jellies[i].sprite.getPosition();
            var jellyObjectData = jellies[i].sprite.getUserData();
            jellies[i].sprite.removeFromParent();
            replaceCoin.sprite.setPosition(jellyPos);
            world.graphicsParent.addChild(replaceCoin.sprite);
            jellyObjectData["pObject"] = replaceCoin;
            replaceCoin.sprite.setUserData(jellyObjectData);
            world.factory.releaseObject(jellies[i]);
        }
    }
});