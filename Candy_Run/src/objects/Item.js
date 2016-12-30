/**
 * Created by SinhBlack on 12/30/2016.
 */
var Item = ObjectGame.extend({
    score:0,
    money:0,
    effects:null,
    ctor:function (objectTypeId) {
        this._super(objectTypeId);
    }
});