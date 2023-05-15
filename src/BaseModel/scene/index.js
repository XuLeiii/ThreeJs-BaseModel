import * as THREE from "three";
import { group, featherGroup } from "./mesh.js";
//1.场景
const scene = new THREE.Scene();
//2.灯光
const ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);
// 平行光  （与点光源不同 是从一个方向来 不是从一个点）
const directionalLight = new THREE.DirectionalLight(0x666666);
directionalLight.position.set(10, -50, 300);
scene.add(directionalLight);
//3.坐标系
const axies = new THREE.AxesHelper(300, 300, 300);

//4.添加网格体
// scene.add(featherGroup);
console.log("featherGroup", featherGroup);
// featherGroup.translateOnAxis(100, 0, 0);
featherGroup.scale.set(100, 100, 100);

// let a = new THREE.Vector3();
// let b = new THREE.Vector3();

// featherGroup.getWorldPosition(a);
// featherGroup.getWorldPosition(b);

// console.log("a", a);
// console.log("b", b);

// console.log("group", group);

scene.add(group, axies, featherGroup);
export { scene };
