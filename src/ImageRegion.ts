interface Vertex {
  x: number | null;
  y: number | null;
}

export type ShapeFilter = 'any' | 'rectangle' | 'circle' | 'polygon';
export type RoleFilter = 'any' | 'crop';

export class ImageRegion {
  public matches(shapeFilter: ShapeFilter, roleFilter: RoleFilter): boolean {
    return (
      this._matchesShapeFilter(shapeFilter) &&
      this._matchesRoleFilter(roleFilter)
    );
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

  // See https://cv.iptc.org/newscodes/imageregionrole/
  private static readonly _CROP_XML_ROLES = [
    'cropping',
    'recommended cropping',
    'landscape format cropping',
    'portrait format cropping',
    'square format cropping',
    'http://cv.iptc.org/newscodes/imageregionrole/cropping',
    'http://cv.iptc.org/newscodes/imageregionrole/recomCropping',
    'http://cv.iptc.org/newscodes/imageregionrole/landscapeCropping',
    'http://cv.iptc.org/newscodes/imageregionrole/portraitCropping',
    'http://cv.iptc.org/newscodes/imageregionrole/squareCropping',
  ];

  private _matchesShapeFilter(shapeFilter: ShapeFilter): boolean {
    return shapeFilter === 'any' || this.shape === shapeFilter;
  }

  private _matchesRoleFilter(roleFilter: RoleFilter): boolean {
    if (roleFilter === 'any') {
      return true;
    }
    if (roleFilter === 'crop') {
      for (const role of this.roles) {
        if (ImageRegion._CROP_XML_ROLES.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }
}
