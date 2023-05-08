import * as THREE from "three";
import { mesh } from "./scene/mesh.js";
import { selectEmissive } from "./utils/outlineEmissive.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
//引入边缘高光函数
let composer = selectEmissive(renderer, mesh);
//3 .轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// 浏览器窗口改变事件
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
export { camera, renderer, controls, composer };
