@frameright/image-display-control-metadata-parser

# @frameright/image-display-control-metadata-parser

## Table of contents

### Classes

- [ImageRegion](classes/ImageRegion.md)
- [Parser](classes/Parser.md)

### Interfaces

- [Vertex](interfaces/Vertex.md)
- [Size](interfaces/Size.md)

### Type Aliases

- [ShapeFilter](README.md#shapefilter)
- [RoleFilter](README.md#rolefilter)

## Type Aliases

### ShapeFilter

Ƭ **ShapeFilter**: ``"any"`` \| ``"rectangle"`` \| ``"circle"`` \| ``"polygon"``

Filter for image regions. If `any`, all regions will be returned. Otherwise
only regions of the given shape will be returned.

#### Defined in

[ImageRegion.ts:20](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L20)

___

### RoleFilter

Ƭ **RoleFilter**: ``"any"`` \| ``"crop"``

Filter for image regions. If `any`, all regions will be returned. Otherwise
if `crop`, only regions with one of the cropping-related roles described
at https://cv.iptc.org/newscodes/imageregionrole/ will be returned.

#### Defined in

[ImageRegion.ts:27](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/src/ImageRegion.ts#L27)
