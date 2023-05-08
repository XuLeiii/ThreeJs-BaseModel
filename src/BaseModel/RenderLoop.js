// import { scene } from "./scene/index.js";
import { renderer, controls, composer } from "./RenderCamera.js";

function render() {
  controls.update();
  composer.render();
  requestAnimationFrame(render);
}
render();

export { renderer };
