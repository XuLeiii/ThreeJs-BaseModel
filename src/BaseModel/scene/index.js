import * as THREE from "three";
import { mesh } from "./mesh.js";
//1.场景
const scene = new THREE.Scene();

//2.灯光
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(200, 200, 200);
scene.add(light);

//3.坐标系
const axies = new THREE.AxesHelper(300, 300, 300);
scene.add(axies);

//4.添加网格体
scene.add(mesh);
export { scene };
