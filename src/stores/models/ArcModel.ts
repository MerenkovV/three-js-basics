import {
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  QuadraticBezierCurve3,
  TubeGeometry,
  Vector3,
} from "three";

export class ArcModel {
  public arcMaterial = new MeshBasicMaterial();

  public group = new Group();

  constructor(start: Vector3, end: Vector3, radius = 0.1) {
    const distance =
      Math.sqrt(Math.abs(start.x - end.x)) +
      Math.sqrt(Math.abs(start.y - end.y));

    const center = new Vector3(
      Math.min(start.x, end.x) +
        (Math.max(start.x, end.x) - Math.min(start.x, end.x)) / 2,
      Math.min(start.y, end.y) +
        (Math.max(start.y, end.y) - Math.min(start.y, end.y)) / 2,
      distance * 3
    );

    const curve = new QuadraticBezierCurve3(start, center, end);

    const tubeGeometry = new TubeGeometry(curve, 100, radius, 8, false);

    const mesh = new Mesh(tubeGeometry, this.arcMaterial);

    this.group.add(mesh);
  }

  public setColor(color: Color) {
    this.arcMaterial.color.set(color);
  }
}
