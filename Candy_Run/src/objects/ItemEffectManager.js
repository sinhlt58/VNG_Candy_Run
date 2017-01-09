/**
 * Created by Fresher on 1/9/2017.
 */

cr.item_effect_manager = {
    itemEffects:{},
    getItemEffectByType:function (itemEffectType) {
        if (!this.itemEffects.hasOwnProperty(itemEffectType)){
            switch(itemEffectType){
                case globals.ITEM_EFFECT_SCORE:
                    this.itemEffects[itemEffectType] = new ItemEffectScore();
                    break;
                case globals.ITEM_EFFECT_MONEY:
                    this.itemEffects[itemEffectType] = new ItemEffectMoney();
                    break;
                case globals.ITEM_EFFECT_GIANT:
                    this.itemEffects[itemEffectType] = new ItemEffectGiant();
                    break;
                case globals.ITEM_EFFECT_INVISIBLE:
                    this.itemEffects[itemEffectType] = new ItemEffectInvisible();
                    break;
                case globals.ITEM_EFFECT_MAGNETIC:
                    this.itemEffects[itemEffectType] = new ItemEffectMagnetic();
                    break;
                case globals.ITEM_EFFECT_FLY:
                    this.itemEffects[itemEffectType] = new ItemEffectFly();
                    break;
                case globals.ITEM_EFFECT_INSTANCE_BONUS:
                    this.itemEffects[itemEffectType] = new ItemEffectInstantBonusTime();
                    break;
                case globals.ITEM_EFFECT_TRANSFORM_COIN:
                    this.itemEffects[itemEffectType] = new ItemEffectTransform();
                    break;
                case globals.ITEM_EFFECT_HEAL:
                    this.itemEffects[itemEffectType] = new ItemEffectHeal();
                    break;
                case globals.ITEM_EFFECT_LETTER:
                    this.itemEffects[itemEffectType] = new ItemEffectLetter();
                    break;
            }
        }
        return this.itemEffects[itemEffectType];
    }
};