/**
 * Created by SinhBlack on 12/30/2016.
 */
var FactoryObject = cc.Class.extend({
    classTypes:null,
    itemEffectTypes:null,
    objectTypes:null,
    ctor:function (classTypes, itemEffectTypes, objectTypes) {
        this.classTypes = classTypes;
        this.itemEffectTypes = itemEffectTypes;
        this.objectTypes = objectTypes;
    },
    getObjectByType:function (objectType) {

    },
    getClassTypeByObjecType:function (objectType) {

    }
});