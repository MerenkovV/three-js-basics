import { Scene, Vector2, Vector3 } from "three";
import { DiskModel } from "./DiskModel";
import { ArcModel } from "./ArcModel";

interface ICircleParams {
  fill?: string;
  stroke?: string;
}

class DisksWithArcModel {
  private arc: ArcModel | null = null;

  public startCircle: DiskModel | null = null;
  public endCircle: DiskModel | null = null;

  constructor(
    scene: Scene,
    startCoord: Vector2,
    startCircleParams: ICircleParams,
    endCoord?: Vector2,
    endCircleParams?: ICircleParams
  ) {
    this.startCircle = new DiskModel(
      startCircleParams?.fill,
      startCircleParams?.stroke
    );

    this.startCircle.group.position.set(startCoord.x, startCoord.y, 0.55);

    scene.add(this.startCircle.group);

    if (endCoord && endCircleParams) {
      this.endCircle = new DiskModel(
        endCircleParams?.fill,
        endCircleParams?.stroke
      );

      this.endCircle.group.position.set(endCoord.x, endCoord.y, 0.55);

      scene.add(this.endCircle.group);
    }

    if (endCoord) {
      this.arc = new ArcModel(
        new Vector3(startCoord.x, startCoord.y, 0.06),
        new Vector3(endCoord.x, endCoord.y, 0.06)
      );

      scene.add(this.arc.group);
    }
  }

  public deInit() {
    this.startCircle?.deInit();
    this.endCircle?.deInit();
  }
}

export default DisksWithArcModel;
