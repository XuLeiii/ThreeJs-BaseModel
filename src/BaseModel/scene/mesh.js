import * as THREE from "three";

//1.网格体
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

export { mesh };
