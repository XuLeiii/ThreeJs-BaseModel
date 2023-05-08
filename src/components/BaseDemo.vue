<template>
  <div></div>
</template>

<script>
import { renderer } from "@/BaseModel/RenderLoop.js";

export default {
  name: "BaseDemo",
  mounted() {
    document.body.appendChild(renderer.domElement);

  },
};
</script>
