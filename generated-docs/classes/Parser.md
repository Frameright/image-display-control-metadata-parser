[**@frameright/image-display-control-metadata-parser**](../README.md) • **Docs**

***

[@frameright/image-display-control-metadata-parser](../README.md) / Parser

# Class: Parser

Parses the XMP metadata of an image, relevant for Image Display Control, i.e.
mostly the image regions, see
<https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#image-region>

## Contents

* [Constructors](#constructors)
  * [new Parser()](#new-parser)
* [Methods](#methods)
  * [getIdcMetadata()](#getidcmetadata)
  * [getXmpMetadata()](#getxmpmetadata)
  * [getSize()](#getsize)

## Constructors

### new Parser()

> **new Parser**(`buffer`): [`Parser`](Parser.md)

#### Parameters

• **buffer**: `Buffer` | `ArrayBuffer`

The image file content.

#### Returns

[`Parser`](Parser.md)

#### Source

[index.ts:30](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/index.ts#L30)

## Methods

### getIdcMetadata()

> **getIdcMetadata**(`shapeFilter`, `roleFilter`, `essentialOnly`): [`ImageRegion`](ImageRegion.md)\[]

Returns XMP IDC metadata in a format similar to what this web-component
expects: <https://github.com/Frameright/image-display-control-web-component>

#### Parameters

• **shapeFilter**: [`ShapeFilter`](../type-aliases/ShapeFilter.md)= `'any'`

Can be used to retrieve only regions of a specific
shape, e.g. 'rectangle'.

• **roleFilter**: [`RoleFilter`](../type-aliases/RoleFilter.md)= `'any'`

Can be used to retrieve only regions of a specific kind
of role, e.g. 'crop'.

• **essentialOnly**: `boolean`= `true`

If true, only essential region properties will be
returned, e.g. properties like `types` and `roles`
will be skipped.

#### Returns

[`ImageRegion`](ImageRegion.md)\[]

#### Source

[index.ts:52](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/index.ts#L52)

***

### getXmpMetadata()

> **getXmpMetadata**(): `XmpTags`

Dumps all XMP metadata.

#### Returns

`XmpTags`

An instance of
[ExifReader.XmpTags](https://github.com/mattiasw/ExifReader/blob/main/exif-reader.d.ts#L121)

#### Source

[index.ts:108](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/index.ts#L108)

***

### getSize()

> **getSize**(): [`Size`](../interfaces/Size.md)

Returns the size of the image in pixels.

#### Returns

[`Size`](../interfaces/Size.md)

#### Note

Caches the result in `this._size` for future calls.

#### Source

[index.ts:117](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/index.ts#L117)
