import ExifReader from 'exifreader';
import sizeOf from 'image-size';
import { ImageRegion, RoleFilter, ShapeFilter, Vertex } from './ImageRegion';
export { ImageRegion, RoleFilter, ShapeFilter, Vertex };

/**
 * Size of an image in pixels.
 */
export interface Size {
  /**
   * Image width in pixels.
   */
  width: number;

  /**
   * Image height in pixels.
   */
  height: number;
}

/**
 * Parses the XMP metadata of an image, relevant for Image Display Control, i.e.
 * mostly the image regions, see
 * https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#image-region
 */
export class Parser {
  /**
   * @param buffer The image file content.
   */
  constructor(buffer: Buffer) {
    this._buffer = buffer;
    try {
      this._metadata = ExifReader.load(this._buffer, { expanded: true });
    } catch (e) {
      this._metadata = {};
    }
  }

  /**
   * Returns XMP IDC metadata in a format similar to what this web-component
   * expects: https://github.com/Frameright/image-display-control-web-component
   *
   * @param shapeFilter Can be used to retrieve only regions of a specific
   *                    shape, e.g. 'rectangle'.
   * @param roleFilter Can be used to retrieve only regions of a specific kind
   *                   of role, e.g. 'crop'.
   * @param essentialOnly If true, only essential region properties will be
   *                      returned, e.g. properties like `types` and `roles`
   *                      will be skipped.
   */
  getIDCMetadata(
    shapeFilter: ShapeFilter = 'any',
    roleFilter: RoleFilter = 'any',
    essentialOnly: boolean = true
  ): ImageRegion[] {
    const result: ImageRegion[] = [];

    if (!this._metadata.xmp) {
      return result;
    }
    if (!Array.isArray(this._metadata.xmp.ImageRegion.value)) {
      return result;
    }

    const xmpRegions = this._metadata.xmp.ImageRegion.value;
    xmpRegions.forEach((xmpRegion) => {
      const region = this._xmpRegionToImageRegion(xmpRegion);
      if (region.matches(shapeFilter, roleFilter)) {
        if (essentialOnly) {
          delete region.types;
          delete region.roles;

          if (region.unit === 'relative') {
            delete region.imageWidth;
            delete region.imageHeight;
          }

          switch (region.shape) {
            case 'rectangle':
              delete region.radius;
              delete region.vertices;
              break;
            case 'circle':
              delete region.width;
              delete region.height;
              delete region.vertices;
              break;
            case 'polygon':
              delete region.x;
              delete region.y;
              delete region.width;
              delete region.height;
              delete region.radius;
              break;
          }
        }
        result.push(region);
      }
    });

    return result;
  }

  /**
   * Returns the size of the image in pixels.
   *
   * @note Caches the result in `this._size` for future calls.
   */
  getSize(): Size {
    if (this._size) {
      return this._size;
    }

    const size = sizeOf(this._buffer);
    this._size = {
      width: size.width || 0,
      height: size.height || 0,
    };
    return this._size;
  }

  // Converts a bag of entity or concepts to an array of strings. See
  // https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#entity-or-concept-structure
  private static _xmpEntityOrConceptsToStringArray(
    xmpEntityOrConcepts: ExifReader.XmpTag
  ): string[] {
    const result: string[] = [];

    const bag = xmpEntityOrConcepts.value as unknown as ExifReader.XmpTag;
    if (Array.isArray(bag)) {
      bag.forEach((xmpEntityOrConcept) => {
        if ('Name' in xmpEntityOrConcept) {
          result.push(
            ...Parser._xmpAltOrBagToStringArray(
              xmpEntityOrConcept['Name'] as ExifReader.XmpTag
            )
          );
        }
        if ('Identifier' in xmpEntityOrConcept) {
          result.push(
            ...Parser._xmpAltOrBagToStringArray(
              xmpEntityOrConcept['Identifier'] as ExifReader.XmpTag
            )
          );
        }
      });
    }

    return result;
  }

  // Converts an XMP rdf:Alt or rdf:Bag tag to an array of strings.
  private static _xmpAltOrBagToStringArray(
    xmpAltOrBag: ExifReader.XmpTag
  ): string[] {
    const result: string[] = [];
    if (Array.isArray(xmpAltOrBag.value)) {
      xmpAltOrBag.value.forEach((item) => {
        if (typeof item.value === 'string') {
          result.push(item.value);
        }
      });
    }
    return result;
  }

  private static _xmpStringToNumber(
    xmpString: ExifReader.XmpTag
  ): number | undefined {
    if (typeof xmpString.value === 'string') {
      return parseFloat(xmpString.value);
    }
    return undefined;
  }

  // Converts an ImageRegion XMP tag to an ImageRegion object.
  private _xmpRegionToImageRegion(region: ExifReader.XmpTag): ImageRegion {
    const result = new ImageRegion();

    const xmpId =
      'rId' in region ? (region['rId'] as ExifReader.XmpTag).value : '';
    if (typeof xmpId === 'string') {
      result.id = xmpId;
    }

    if ('Name' in region) {
      result.names = Parser._xmpAltOrBagToStringArray(
        region['Name'] as ExifReader.XmpTag
      );
    }

    if ('rCtype' in region) {
      result.types = Parser._xmpEntityOrConceptsToStringArray(
        region['rCtype'] as ExifReader.XmpTag
      );
    }

    if ('rRole' in region) {
      result.roles = Parser._xmpEntityOrConceptsToStringArray(
        region['rRole'] as ExifReader.XmpTag
      );
    }

    if ('RegionBoundary' in region) {
      const xmpRegionBoundary = (region['RegionBoundary'] as ExifReader.XmpTag)
        .value as unknown as ExifReader.XmpTag;
      if ('rbShape' in xmpRegionBoundary) {
        const xmpShape = (xmpRegionBoundary['rbShape'] as ExifReader.XmpTag)
          .value;
        if (typeof xmpShape === 'string') {
          result.shape = xmpShape;
        }
      }
      if ('rbUnit' in xmpRegionBoundary) {
        const xmpUnit = (xmpRegionBoundary['rbUnit'] as ExifReader.XmpTag)
          .value;
        if (typeof xmpUnit === 'string') {
          result.unit = xmpUnit;
        }
      }
      if ('rbX' in xmpRegionBoundary) {
        result.x = Parser._xmpStringToNumber(
          xmpRegionBoundary['rbX'] as ExifReader.XmpTag
        );
      }
      if ('rbY' in xmpRegionBoundary) {
        result.y = Parser._xmpStringToNumber(
          xmpRegionBoundary['rbY'] as ExifReader.XmpTag
        );
      }
      if ('rbW' in xmpRegionBoundary) {
        result.width = Parser._xmpStringToNumber(
          xmpRegionBoundary['rbW'] as ExifReader.XmpTag
        );
      }
      if ('rbH' in xmpRegionBoundary) {
        result.height = Parser._xmpStringToNumber(
          xmpRegionBoundary['rbH'] as ExifReader.XmpTag
        );
      }
      if ('rbRx' in xmpRegionBoundary) {
        result.radius = Parser._xmpStringToNumber(
          xmpRegionBoundary['rbRx'] as ExifReader.XmpTag
        );
      }
      if ('rbVertices' in xmpRegionBoundary) {
        const xmpVertices = (
          xmpRegionBoundary['rbVertices'] as ExifReader.XmpTag
        ).value;
        if (Array.isArray(xmpVertices)) {
          xmpVertices.forEach((vertex) => {
            let vertexX: number | undefined;
            let vertexY: number | undefined;
            if ('rbX' in vertex) {
              vertexX = Parser._xmpStringToNumber(
                vertex['rbX'] as ExifReader.XmpTag
              );
            }
            if ('rbY' in vertex) {
              vertexY = Parser._xmpStringToNumber(
                vertex['rbY'] as ExifReader.XmpTag
              );
            }
            if (vertexX !== undefined && vertexY !== undefined) {
              if (!Array.isArray(result.vertices)) {
                result.vertices = [];
              }
              result.vertices.push({ x: vertexX, y: vertexY });
            }
          });
        }
      }
    }

    const size = this.getSize();
    result.imageWidth = size.width;
    result.imageHeight = size.height;

    return result;
  }

  private _buffer: Buffer;
  private _metadata: ExifReader.ExpandedTags;
  private _size: Size | null = null;
}
