import { makeAutoObservable } from "mobx";
import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

class ThreeStore {
  public rendered = false;

  public scene = new Scene();

  public camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );

  public renderer = new WebGLRenderer();

  public targetGroup: Group = new Group();

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public initThree(view: HTMLDivElement) {
    this.rendered = true;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.set(0, 0, 100);

    this.camera.lookAt(0, 0, 0);

    view.appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    this.setMesh();

    this.renderThree();
  }

  private renderThree() {
    this.renderer.render(this.scene, this.camera);
    this.rotateGroup();

    requestAnimationFrame(this.renderThree);
  }

  private rotateGroup() {
    if (!this.targetGroup) {
      return;
    }

    this.targetGroup.rotation.x += 0.01;
    // this.targetGroup.rotation.y += 0.01;
  }

  public setMesh() {
    // const cubeGeometry = new BoxGeometry(1, 1, 1);

    // const cubeMaterial = new MeshBasicMaterial({ color: 0x00ff00 });

    const points = [];

    for (let index = 0; index < 15; index++) {
      const pos = new Array(3).fill(Math.random() * 20);

      points.push(new Vector3(pos[0] - index * 5, pos[1], pos[2]));
    }

    const lineGeometry = new BufferGeometry().setFromPoints(points);

    const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });

    // this.targetMesh = new Mesh(lineGeometry, lineMaterial);

    const line = new Line(lineGeometry, lineMaterial);

    this.targetGroup?.add(line);

    this.scene.add(this.targetGroup);
  }
}

export default new ThreeStore();
