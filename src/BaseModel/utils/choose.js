import * as THREE from "three";
import { camera } from "../RenderCamera.js";
import { meshMesh } from "../scene/mesh.js";
import { tags } from "./tags.js";
import { scene } from "../scene/index.js";
// import { box3Compute } from "../utils/box3Compute.js"; //计算被拾取的网格的中心坐标
// import { selectEmissive } from "./outlineEmissive.js";
let labelGroup = new THREE.Group(); //是个对象
let chooseMesh = null;
function choose(event) {
  if (chooseMesh) {
    // chooseMesh.material.color.set(0xffffff);
    console.log("chooseMesh", chooseMesh); //当选A模型后，再选择B模型，此时需要将A模型的颜色设为本身的颜色
    chooseMesh.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
    });
    chooseMesh.children = []; //移除线
    if (labelGroup.children.length > 1) {
      labelGroup.children.shift();
    }
    labelGroup.children[0].visible = false;
    // labelGroup.children.shift();
    // console.log("label", labelGroup);
  }
  //1.获取当前鼠标的坐标
  let Sx = event.clientX;
  let Sy = event.clientY;
  //2.转换屏幕坐标系为webgl坐标系
  let x = (Sx / window.innerWidth) * 2 - 1;
  let y = -(Sy / window.innerHeight) * 2 + 1;
  //3.引入射线类
  let raycaster = new THREE.Raycaster();
  //4.根据摄像机生成射线向量
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //5.计算和射线相交的网格模型,若有相交则返回一个数组对象，否则返回一个空数组
  // console.log("物体爆炸后的meshMesh", meshMesh);
  let intersetc = raycaster.intersectObjects(meshMesh); //应该获取动态的网格体数组
  //6.如果intersetc的大于零，说明有模型被选中，可以对该模型进行后续操作
  // console.log("intersetc", intersetc);
  if (intersetc.length > 0) {
    //1.取出被选中的模型
    chooseMesh = intersetc[0].object;
    //射线与网格的交点坐标
    // console.log("被选中的intersetc有几个模型？", intersetc);
    // chooseMesh.material.color.set(0xff0000);
    chooseMesh.material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    });
    const edges = new THREE.EdgesGeometry(chooseMesh.geometry, 1);
    const edgesMmaterial = new THREE.LineBasicMaterial({
      color: 0x00ff00,
    });
    const line = new THREE.LineSegments(edges, edgesMmaterial);
    chooseMesh.add(line);
    // console.log("选中的chooseMesh", chooseMesh);
    //生成标签，添加标签，并定位标签。
    let label = tags(chooseMesh.name);
    let pos = new THREE.Vector3(
      chooseMesh.position.x * 100,
      chooseMesh.position.y * 100,
      chooseMesh.position.z * 100
    );
    label.position.copy(pos);
    // console.log("labelllllll", label);
    labelGroup.add(label);
    // console.log("labelGroup", labelGroup);
  } else {
    chooseMesh = 0;
  }
}
scene.add(labelGroup);

export { choose, labelGroup, chooseMesh };
