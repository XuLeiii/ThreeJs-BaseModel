import * as THREE from "three";
import { scene } from "./scene/index.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { mesh } from "./scene/mesh.js";
//1.相机
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(300, 300, 300);
camera.lookAt(0, 0, 0);

//2.渲染器

//加入webgl渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
//加入线框渲染器
const outlinePass = new OutlinePass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  scene,
  camera
);
composer.addPass(outlinePass);
//线框通道参数
let params = {
  edgeStrength: 10, //边框亮度
  edgeGlow: 1, //光晕[0,1]
  edgeThickness: 4, //边缘浓度
  pulsePeriod: 5, //呼吸闪烁的速度 闪烁频率 ，默认0 ，值越大频率越低
  rotate: false,
  usePatternTexture: false, //是否使用父级的材质
};

//设置线框效果
outlinePass.edgeStrength = Number(params.edgeStrength);
outlinePass.edgeGlow = Number(params.edgeGlow);
outlinePass.edgeThickness = Number(params.edgeThickness);
outlinePass.pulsePeriod = Number(params.pulsePeriod);
outlinePass.visibleEdgeColor.set("#00ff00"); // 边缘可见部分发颜色 sColor[0].color
outlinePass.hiddenEdgeColor.set("#00ff00"); // 边缘遮挡部分发光颜色 sColor[1].color
outlinePass.selectedObjects = [mesh]; //指定被线框渲染器渲染的模型

//3.轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// 浏览器窗口改变事件
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
export { camera, renderer, controls, composer };
