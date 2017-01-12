/**
 * Created by Fresher on 1/7/2017.
 */
var TestArr = cc.Class.extend({
    arr: [],
    count: 0,
    ctor: function () {
        this.arr.push("1");
        this.count++;
    }
});


for(var i=0;i<100;++i){
    var tmp= new TestArr();

    //console.log(tmp.count+" "+tmp.arr);
}


var Test = function () {
    this.arr = [];
    this.arr.push(1);
};

for(var i=0;i<100;++i){

    var t= new Test();

    cc.log(t.arr);

}