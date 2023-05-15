import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//1.网格体
const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);
//解码gltf文件
let group = new THREE.Group();
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
let gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
let meshPosition = []; //每个模型的初始位置坐标数组
let meshMesh = []; //每个模型网格体
let a = [];
let featherGroup = new THREE.Group();

gltfLoader.load("/model/111.glb", (gltf) => {
  group.add(gltf.scene);
  gltf.scene.traverse((child) => {
    if (
      child.type === "Mesh" &&
      child.name !== "FEATHER000" &&
      child.name !== "FEATHER002" &&
      child.name !== "FEATHER004"
    ) {
      child.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        side: THREE.DoubleSide,
      });
      meshPosition.push(JSON.parse(JSON.stringify(child.position))); //传的是位置对象的指针
      meshMesh.push(child);
    }
    if (
      child.name === "FEATHER000" ||
      child.name === "FEATHER002" ||
      child.name === "FEATHER004"
    ) {
      a.push(child);
      child.position.set(-0.0023363609798252583, 0, 0.06955356150865555);
      console.log("aa", a);
      child.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        side: THREE.DoubleSide,
      });
      meshPosition.push(JSON.parse(JSON.stringify(child.position))); //传的是位置对象的指针
      meshMesh.push(child);
    }
  });
  featherGroup.position.set(0, 52.93440818786621, 0);
  featherGroup.add(...a);
  console.log("featherGroup", featherGroup);
  let axies = new THREE.AxesHelper();
  featherGroup.add(axies);
});

export { mesh, group, meshMesh, featherGroup, meshPosition };
