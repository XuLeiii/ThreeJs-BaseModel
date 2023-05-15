import { scene } from "./scene/index.js";
import { renderer, controls, composer, camera } from "./RenderCamera.js";
import TWEEN from "@tweenjs/tween.js";
import { labelRenderer } from "./utils/tags.js";

function render() {
  controls.update();
  composer.render();
  requestAnimationFrame(render);
  labelRenderer.render(scene, camera);
  TWEEN.update();
}
render();

export { renderer };
