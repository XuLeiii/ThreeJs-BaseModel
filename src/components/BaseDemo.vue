<template>
  <div>
    <button class="baozha" @click="explode()">爆炸图</button>
    <p style="position: absolute; margin-left: 100px; color: aliceblue">
      当前转速每秒{{ this.speed }}圈
    </p>
    <input
      type="text"
      style="position: absolute; margin-left: 230px"
      v-model="speed"
      @blur="animateSpeed(speed)"
    />
  </div>
</template>
<script>
import * as THREE from "three";
import { renderer } from "@/BaseModel/RenderLoop.js";
import { animateCamera, resetAnimation } from "@/BaseModel/utils/animateCamera";
import {
  meshMesh,
  meshPosition,
  featherGroup,
} from "@/BaseModel/scene/mesh.js";
import { choose, labelGroup, chooseMesh } from "../BaseModel/utils/choose.js";
import { gsap } from "gsap/all";

export default {
  name: "BaseDemo",
  data() {
    return {
      isRestart: true,
      speed: 1,
      // meshPosition123: meshPosition,
    };
  },
  methods: {
    //爆炸
    explode() {
      //爆炸后的坐标
      let target = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: -0.0019452804699540138, y: 0.5302404761314392, z: 0.5 }, //Cylinder003
        { x: -0.3, y: 0, z: 0.5 }, //FEATHER000
        { x: 0.3, y: 0, z: 0.5 }, //FEATHER002
        { x: 0, y: -0.3, z: 0.5 }, //FEATHER004
        { x: 0, y: 0.5270451307296753, z: 1 }, //GRILL
      ];
      if (this.isRestart) {
        console.log("meshPosition", meshPosition);
        let deepPosition = JSON.parse(JSON.stringify(meshPosition));
        animateCamera(deepPosition, target, meshMesh, 1000);
        this.isRestart = false;
        window.addEventListener("dblclick", (e) => {
          choose(e);
        });
        // console.log("window", window.addEventListener());
      } else {
        let deepPosition = JSON.parse(JSON.stringify(meshPosition));
        resetAnimation(target, deepPosition, meshMesh, 1000);
        this.isRestart = true;
        // console.log("labelGroup11111", labelGroup);
        labelGroup.children[1].visible = false;
        // chooseMesh.material.color.set(0xffffff);
        chooseMesh.children = [];
        chooseMesh.material = new THREE.MeshLambertMaterial({
          color: 0xffffff,
        });
        window.removeEventListener("dblclick", choose);
        // console.log("window", window);
      }
    },
    //控制动画
    animateSpeed(speed) {
      gsap.to(featherGroup.rotation, {
        z: Math.PI * 2 * speed,
        duration: 1,
        ease: "none",
        repeat: -1,
      });
    },
  },
  async mounted() {
    await document.body.appendChild(renderer.domElement);
    // console.log("meshPosition mounted", meshPosition);
    //风扇动画
  },
};
</script>

<style scoped>
.baozha {
  position: absolute;
}
</style>
