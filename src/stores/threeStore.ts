import { makeAutoObservable } from "mobx";
import {
  AmbientLight,
  Group,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

import textureImage from "../assets/earthMap.jpg";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import DisksWithArcModel from "./models/DisksWithArcModel";
import { Group as TweenGroup } from "@tweenjs/tween.js";

class ThreeStore {
  public rendered = false;

  public scene = new Scene();

  public camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );

  public light = new AmbientLight();

  public renderer = new WebGLRenderer();

  public targetGroup: Group = new Group();

  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  private view: HTMLElement | null = null;

  private tweenGroup: TweenGroup | null = null;

  private arc: DisksWithArcModel | null = null;
  private radius = 1;
  private isScaleUp = true;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public initThree(view: HTMLDivElement) {
    this.rendered = true;

    this.view = view;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.set(0, 0, 200);

    this.camera.lookAt(0, 0, 0);

    this.scene.add(this.light);

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

    this.controls.update();
    //this.scaleCircle();

    if (this.tweenGroup) {
      this.tweenGroup.update();
    }

    requestAnimationFrame(this.renderThree);
  }

  private scaleCircle() {
    if (!this.arc) {
      return;
    }

    if (this.isScaleUp) {
      this.radius += 0.01;
      this.arc.startCircle?.setRadius(this.radius);
      this.arc.endCircle?.setRadius(this.radius * 1.5);

      if (this.radius >= 5) {
        this.isScaleUp = false;
      }
    } else {
      this.radius -= 0.01;
      this.arc.startCircle?.setRadius(this.radius);
      this.arc.endCircle?.setRadius(this.radius * 1.5);

      if (this.radius <= 2) {
        this.isScaleUp = true;
      }
    }
  }

  public setMesh() {
    const planeGeometry = new PlaneGeometry(360, 180);

    //const sphereGeometry = new SphereGeometry(90, 32, 32);

    const texture = new TextureLoader().load(textureImage);

    const phongMaterial = new MeshPhongMaterial({
      map: texture,
    });

    const earthMesh = new Mesh(planeGeometry, phongMaterial);

    this.targetGroup?.add(earthMesh);

    this.arc = new DisksWithArcModel(
      this.scene,
      new Vector2(-84.971345, 56.454738),
      {
        fill: "blue",
        stroke: "white",
      },
      new Vector2(78.971345, 18.454738),
      {
        fill: "rgba(157, 23, 23, 0.17)",
        stroke: "black",
      }
    );

    this.scene.add(this.targetGroup);
  }

  public deInitThree() {
    this.scene.clear();
    this.renderer.clear();
    this.view?.children[0].remove();

    this.targetGroup.clear();

    this.rendered = false;
  }
}

export default new ThreeStore();
