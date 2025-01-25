import {
  BufferGeometry,
  CircleGeometry,
  EllipseCurve,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
} from "three";

const DEFAULT_RADIUS = 1;

const ELLIPSE_CURVE = new EllipseCurve(0, 0, DEFAULT_RADIUS, DEFAULT_RADIUS);

export class DiskModel {
  public innerGeometry = new CircleGeometry(DEFAULT_RADIUS, 32);

  public innerMaterial = new MeshBasicMaterial();

  public outerGeometry = new BufferGeometry().setFromPoints(
    ELLIPSE_CURVE.getPoints(50)
  );

  public outerMaterial = new LineBasicMaterial();

  public group = new Group();

  constructor(fill: string = "#fff", stroke?: string) {
    this.innerMaterial.color.set(fill);

    this.innerMaterial.transparent = true;

    this.outerMaterial.opacity = 0.2;

    const innerMesh = new Mesh(this.innerGeometry, this.innerMaterial);

    this.group.add(innerMesh);

    if (stroke) {
      this.outerMaterial.color.set(stroke);

      this.outerMaterial.transparent = true;

      this.outerMaterial.opacity = 0.2;

      const outerLine = new Line(this.outerGeometry, this.outerMaterial);

      this.group.add(outerLine);
    }
  }

  public setRadius(radius: number) {
    this.group.scale.set(radius, radius, 1);
  }

  public setColor(fill: string = "#fff", stroke?: string) {
    this.innerMaterial.color.set(fill);

    if (stroke) {
      this.outerMaterial.color.set(stroke);

      if (this.group.children.length === 1) {
        const outerLine = new Line(this.outerGeometry, this.outerMaterial);

        this.group.add(outerLine);
      }
    }
  }

  public deInit() {
    this.group.clear();
  }
}
