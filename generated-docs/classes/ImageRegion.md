[@frameright/image-display-control-metadata-parser](../README.md) / ImageRegion

# Class: ImageRegion

## Table of contents

### Methods

- [matches](ImageRegion.md#matches)

### Properties

- [id](ImageRegion.md#id)
- [names](ImageRegion.md#names)
- [shape](ImageRegion.md#shape)
- [types](ImageRegion.md#types)
- [roles](ImageRegion.md#roles)
- [unit](ImageRegion.md#unit)
- [imageWidth](ImageRegion.md#imagewidth)
- [imageHeight](ImageRegion.md#imageheight)
- [x](ImageRegion.md#x)
- [y](ImageRegion.md#y)
- [width](ImageRegion.md#width)
- [height](ImageRegion.md#height)
- [radius](ImageRegion.md#radius)
- [vertices](ImageRegion.md#vertices)

## Methods

### matches

▸ **matches**(`shapeFilter`, `roleFilter`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `shapeFilter` | [`ShapeFilter`](../README.md#shapefilter) |
| `roleFilter` | [`RoleFilter`](../README.md#rolefilter) |

#### Returns

`boolean`

`true` if the region matches the given shape and role filters.

#### Defined in

[ImageRegion.ts:33](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L33)

## Properties

### id

• **id**: `string` = `''`

Identifier for the region. Unique within the image.

#### Defined in

[ImageRegion.ts:43](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L43)

___

### names

• **names**: `string`[] = `[]`

Names for the region, possibly in multiple languages.

#### Defined in

[ImageRegion.ts:48](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L48)

___

### shape

• **shape**: `string` = `''`

Region shape, can be `rectangle`, `circle` or `polygon`.

#### Defined in

[ImageRegion.ts:53](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L53)

___

### types

• `Optional` **types**: `string`[]

Region types, see https://cv.iptc.org/newscodes/imageregiontype/

#### Defined in

[ImageRegion.ts:58](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L58)

___

### roles

• `Optional` **roles**: `string`[]

Region roles, see https://cv.iptc.org/newscodes/imageregionrole/

#### Defined in

[ImageRegion.ts:63](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L63)

___

### unit

• **unit**: `string` = `''`

Unit used for `x`, `y`, `width`, `height`, `radius` and `vertices`. Can be
`relative` or `pixel`, see
https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#boundary-measuring-unit

#### Defined in

[ImageRegion.ts:70](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L70)

___

### imageWidth

• `Optional` **imageWidth**: `number`

Original/full image width. Reference width to be used as a base for `x`,
`width`, `radius` and `vertices/x` when `unit` is `pixel`. See
https://github.com/Frameright/image-display-control-web-component/blob/main/image-display-control/docs/reference/attributes.md

#### Defined in

[ImageRegion.ts:77](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L77)

___

### imageHeight

• `Optional` **imageHeight**: `number`

Original/full image width. Reference width to be used as a base for `y`,
`height` and `vertices/y` when `unit` is `pixel`. See
https://github.com/Frameright/image-display-control-web-component/blob/main/image-display-control/docs/reference/attributes.md

#### Defined in

[ImageRegion.ts:84](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L84)

___

### x

• `Optional` **x**: `number`

Coordinates of a `rectangle` or `circle` region.

#### Defined in

[ImageRegion.ts:89](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L89)

___

### y

• `Optional` **y**: `number`

Coordinates of a `rectangle` or `circle` region.

#### Defined in

[ImageRegion.ts:94](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L94)

___

### width

• `Optional` **width**: `number`

Width of a `rectangle` region.

#### Defined in

[ImageRegion.ts:99](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L99)

___

### height

• `Optional` **height**: `number`

Height of a `rectangle` region.

#### Defined in

[ImageRegion.ts:104](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L104)

___

### radius

• `Optional` **radius**: `number`

Radius of a `circle` region.

#### Defined in

[ImageRegion.ts:109](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L109)

___

### vertices

• `Optional` **vertices**: [`Vertex`](../interfaces/Vertex.md)[]

Vertices/corners of a `polygon` region.

#### Defined in

[ImageRegion.ts:114](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L114)
