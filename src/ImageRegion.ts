/**
 * Vertex/corner of a `polygon` region.
 */
export interface Vertex {
  /**
   * Coordinates of the vertex.
   */
  x: number;

  /**
   * Coordinates of the vertex.
   */
  y: number;
}

/**
 * Filter for image regions. If `any`, all regions will be returned. Otherwise
 * only regions of the given shape will be returned.
 */
export type ShapeFilter = 'any' | 'rectangle' | 'circle' | 'polygon';

/**
 * Filter for image regions. If `any`, all regions will be returned. Otherwise
 * if `crop`, only regions with one of the cropping-related roles described
 * at https://cv.iptc.org/newscodes/imageregionrole/ will be returned.
 */
export type RoleFilter = 'any' | 'crop';

export class ImageRegion {
  /**
   * @return `true` if the region matches the given shape and role filters.
   */
  public matches(shapeFilter: ShapeFilter, roleFilter: RoleFilter): boolean {
    return (
      this._matchesShapeFilter(shapeFilter) &&
      this._matchesRoleFilter(roleFilter)
    );
  }

  /**
   * Identifier for the region. Unique within the image.
   */
  public id: string = '';

  /**
   * Names for the region, possibly in multiple languages.
   */
  public names: string[] = [];

  /**
   * Region shape, can be `rectangle`, `circle` or `polygon`.
   */
  public shape: string = '';

  /**
   * Region types, see https://cv.iptc.org/newscodes/imageregiontype/
   */
  public types?: string[];

  /**
   * Region roles, see https://cv.iptc.org/newscodes/imageregionrole/
   */
  public roles?: string[];

  /**
   * Unit used for `x`, `y`, `width`, `height`, `radius` and `vertices`. Can be
   * `relative` or `pixel`, see
   * https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#boundary-measuring-unit
   */
  public unit: string = '';

  /**
   * Original/full image width. Reference width to be used as a base for `x`,
   * `width`, `radius` and `vertices/x` when `unit` is `pixel`. See
   * https://docs.frameright.io/web-component/attribute-ref
   */
  public imageWidth?: number;

  /**
   * Original/full image width. Reference width to be used as a base for `y`,
   * `height` and `vertices/y` when `unit` is `pixel`. See
   * https://docs.frameright.io/web-component/attribute-ref
   */
  public imageHeight?: number;

  /**
   * Coordinates of a `rectangle` or `circle` region.
   */
  public x?: number;

  /**
   * Coordinates of a `rectangle` or `circle` region.
   */
  public y?: number;

  /**
   * Width of a `rectangle` region.
   */
  public width?: number;

  /**
   * Height of a `rectangle` region.
   */
  public height?: number;

  /**
   * Radius of a `circle` region.
   */
  public radius?: number;

  /**
   * Vertices/corners of a `polygon` region.
   */
  public vertices?: Vertex[];

  /**
   * Identifier for the region definition.
   */
  public idcRegionDefinitionId?: string;

  /**
   * Name for the region definition.
   */
  public idcRegionDefinitionName?: string;

  /**
   * See https://cv.iptc.org/newscodes/imageregionrole/
   */
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
      for (const role of this.roles || []) {
        if (ImageRegion._CROP_XML_ROLES.includes(role)) {
          return true;
        }
      }
    }

    return false;
  }
}
