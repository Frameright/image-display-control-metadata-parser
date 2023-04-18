interface Vertex {
  x: number | null;
  y: number | null;
}

export type ShapeFilter = 'any' | 'rectangle' | 'circle' | 'polygon';

export class ImageRegion {
  public matches(shapeFilter: ShapeFilter): boolean {
    return shapeFilter === 'any' || this.shape === shapeFilter;
  }

  public id: string = '';
  public names: string[] = [];
  public shape: string = '';
  public types: string[] = [];
  public roles: string[] = [];

  // Can be 'relative' or 'pixel', see
  // https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#boundary-measuring-unit
  public unit: string = '';

  // Useful when unit is 'pixel', see
  // https://github.com/Frameright/image-display-control-web-component/blob/main/image-display-control/docs/reference/attributes.md
  public imageWidth: number = 0;
  public imageHeight: number = 0;

  public x: number | null = null;
  public y: number | null = null;
  public width: number | null = null;
  public height: number | null = null;
  public radius: number | null = null;
  public vertices: Vertex[] = [];
}
