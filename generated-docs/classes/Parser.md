[@frameright/image-display-control-metadata-parser](../README.md) / Parser

# Class: Parser

Parses the XMP metadata of an image, relevant for Image Display Control, i.e.
mostly the image regions, see
https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#image-region

## Table of contents

### Constructors

- [constructor](Parser.md#constructor)

### Methods

- [getIDCMetadata](Parser.md#getidcmetadata)
- [getSize](Parser.md#getsize)

## Constructors

### constructor

• **new Parser**(`buffer`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `Buffer` | The image file content. |

#### Defined in

[index.ts:30](https://github.com/AurelienLourot/image-display-control-metadata-parser/blob/main/src/index.ts#L30)

## Methods

### getIDCMetadata

▸ **getIDCMetadata**(`shapeFilter?`, `roleFilter?`, `essentialOnly?`): [`ImageRegion`](ImageRegion.md)[]

Returns XMP IDC metadata in a format similar to what this web-component
expects: https://github.com/Frameright/image-display-control-web-component

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `shapeFilter` | [`ShapeFilter`](../README.md#shapefilter) | `'any'` | Can be used to retrieve only regions of a specific shape, e.g. 'rectangle'. |
| `roleFilter` | [`RoleFilter`](../README.md#rolefilter) | `'any'` | Can be used to retrieve only regions of a specific kind of role, e.g. 'crop'. |
| `essentialOnly` | `boolean` | `true` | If true, only essential region properties will be returned, e.g. properties like `types` and `roles` will be skipped. |

#### Returns

[`ImageRegion`](ImageRegion.md)[]

#### Defined in

[index.ts:51](https://github.com/AurelienLourot/image-display-control-metadata-parser/blob/main/src/index.ts#L51)

___

### getSize

▸ **getSize**(): [`Size`](../interfaces/Size.md)

Returns the size of the image in pixels.

**`Note`**

Caches the result in `this._size` for future calls.

#### Returns

[`Size`](../interfaces/Size.md)

#### Defined in

[index.ts:109](https://github.com/AurelienLourot/image-display-control-metadata-parser/blob/main/src/index.ts#L109)
