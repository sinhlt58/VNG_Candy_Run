/**
 * Created by SinhBlack on 1/2/2017.
 */
var TriggerBackToLoop = Trigger.extend({
    ctor:function (world) {
        this._super(world);
    },
    update:function (dt) {
        console.log("Inside trigger back to loop.");
    }
});