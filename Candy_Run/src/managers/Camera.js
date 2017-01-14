/**
 * Created by SinhBlack on 1/14/2017.
 */
var Camera = {
  animationLayer : null,
  init:function (animationLayer) {
      this.animationLayer = animationLayer;
  },
  getCurrentCameraY:function () {
      return this.animationLayer.getCurrentCameraY();
  }
};