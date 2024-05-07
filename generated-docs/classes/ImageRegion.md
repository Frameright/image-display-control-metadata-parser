[**@frameright/image-display-control-metadata-parser**](../README.md) • **Docs**

***

[@frameright/image-display-control-metadata-parser](../README.md) / ImageRegion

# Class: ImageRegion

## Properties

### id

> **id**: `string` = `''`

Identifier for the region. Unique within the image.

#### Source

[ImageRegion.ts:43](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L43)

***

### names

> **names**: `string`[] = `[]`

Names for the region, possibly in multiple languages.

#### Source

[ImageRegion.ts:48](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L48)

***

### shape

> **shape**: `string` = `''`

Region shape, can be `rectangle`, `circle` or `polygon`.

#### Source

[ImageRegion.ts:53](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L53)

***

### types?

> `optional` **types**: `string`[]

Region types, see https://cv.iptc.org/newscodes/imageregiontype/

#### Source

[ImageRegion.ts:58](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L58)

***

### roles?

> `optional` **roles**: `string`[]

Region roles, see https://cv.iptc.org/newscodes/imageregionrole/

#### Source

[ImageRegion.ts:63](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L63)

***

### unit

> **unit**: `string` = `''`

Unit used for `x`, `y`, `width`, `height`, `radius` and `vertices`. Can be
`relative` or `pixel`, see
https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#boundary-measuring-unit

#### Source

[ImageRegion.ts:70](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L70)

***

### imageWidth?

> `optional` **imageWidth**: `number`

Original/full image width. Reference width to be used as a base for `x`,
`width`, `radius` and `vertices/x` when `unit` is `pixel`. See
https://docs.frameright.io/web-component/attribute-ref

#### Source

[ImageRegion.ts:77](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L77)

***

### imageHeight?

> `optional` **imageHeight**: `number`

Original/full image width. Reference width to be used as a base for `y`,
`height` and `vertices/y` when `unit` is `pixel`. See
https://docs.frameright.io/web-component/attribute-ref

#### Source

[ImageRegion.ts:84](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L84)

***

### x?

> `optional` **x**: `number`

Coordinates of a `rectangle` or `circle` region.

#### Source

[ImageRegion.ts:89](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L89)

***

### y?

> `optional` **y**: `number`

Coordinates of a `rectangle` or `circle` region.

#### Source

[ImageRegion.ts:94](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L94)

***

### width?

> `optional` **width**: `number`

Width of a `rectangle` region.

#### Source

[ImageRegion.ts:99](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L99)

***

### height?

> `optional` **height**: `number`

Height of a `rectangle` region.

#### Source

[ImageRegion.ts:104](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L104)

***

### radius?

> `optional` **radius**: `number`

Radius of a `circle` region.

#### Source

[ImageRegion.ts:109](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L109)

***

### vertices?

> `optional` **vertices**: [`Vertex`](../interfaces/Vertex.md)[]

Vertices/corners of a `polygon` region.

#### Source

[ImageRegion.ts:114](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L114)

***

### idcRegionDefinitionId?

> `optional` **idcRegionDefinitionId**: `string`

Identifier for the region definition.

#### Source

[ImageRegion.ts:119](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L119)

***

### idcRegionDefinitionName?

> `optional` **idcRegionDefinitionName**: `string`

Name for the region definition.

#### Source

[ImageRegion.ts:124](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L124)

## Methods

### matches()

> **matches**(`shapeFilter`, `roleFilter`): `boolean`

#### Parameters

• **shapeFilter**: [`ShapeFilter`](../type-aliases/ShapeFilter.md)

• **roleFilter**: [`RoleFilter`](../type-aliases/RoleFilter.md)

#### Returns

`boolean`

`true` if the region matches the given shape and role filters.

#### Source

[ImageRegion.ts:33](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L33)
