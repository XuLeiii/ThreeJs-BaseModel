import TWEEN from "@tweenjs/tween.js";

function animateCamera(current, target, meshMesh, time) {
  // console.log("current", current);
  let st = {}; //模型初始位置坐标
  current.forEach((item, index) => {
    st[`x${index + 1}`] = item.x;
    st[`y${index + 1}`] = item.y;
    st[`z${index + 1}`] = item.z;
  });
  let end = {}; //模型终点坐标
  target.forEach((item, index) => {
    end[`x${index + 1}`] = item.x;
    end[`y${index + 1}`] = item.y;
    end[`z${index + 1}`] = item.z;
  });
  const tween = new TWEEN.Tween(st); //初始位置
  tween.to(end, time); //终点位置
  tween.onUpdate(function () {
    // console.log("this", this._object.x1);
    meshMesh.forEach((item, index) => {
      item.position.x = this._object[`x${index + 1}`];
      item.position.y = this._object[`y${index + 1}`];
      item.position.z = this._object[`z${index + 1}`];
    });
  });
  tween.easing(TWEEN.Easing.Elastic.InOut);
  tween.start();
}
function resetAnimation(current1, target1, meshMesh, time) {
  let st = {};
  current1.forEach((item, index) => {
    st[`x${index + 1}`] = item.x;
    st[`y${index + 1}`] = item.y;
    st[`z${index + 1}`] = item.z;
  });
  // console.log("st", st);
  // console.log("target", target1);
  let end = {};
  target1.forEach((item, index) => {
    end[`x${index + 1}`] = item.x;
    end[`y${index + 1}`] = item.y;
    end[`z${index + 1}`] = item.z;
  });
  // console.log("end", end);
  const tween = new TWEEN.Tween(st); //初始位置
  tween.to(end, time); //终点位置
  tween.onUpdate(function () {
    // console.log("this", this._object.x1);
    meshMesh.forEach((item, index) => {
      item.position.x = this._object[`x${index + 1}`];
      item.position.y = this._object[`y${index + 1}`];
      item.position.z = this._object[`z${index + 1}`];
    });
  });
  tween.easing(TWEEN.Easing.Elastic.InOut);
  tween.start();
}
export { animateCamera, resetAnimation };
