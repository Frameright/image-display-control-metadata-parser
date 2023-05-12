import { Parser } from '../src';
import { promises as fs } from 'fs';

describe('Parser', () => {
  it('can get all IDC metadata', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata('any', 'any', false)).toEqual([
      {
        id: 'persltr2',
        names: ['Listener 1'],
        shape: 'rectangle',
        types: [
          'Region Boundary Content Type Name (ref2021.1)',
          'https://example.org/rctype/type2021.1a',
          'https://example.org/rctype/type2021.1b',
        ],
        roles: [
          'Region Boundary Content Role Name (ref2021.1)',
          'https://example.org/rrole/role2021.1a',
          'https://example.org/rrole/role2021.1b',
        ],
        unit: 'relative',
        imageWidth: 2000,
        imageHeight: 1000,
        x: 0.31,
        y: 0.18,
        width: 0.127,
        height: 0.385,
      },
      {
        id: 'persltr3',
        names: ['Listener 2'],
        shape: 'circle',
        types: [
          'Region Boundary Content Type Name (ref2021.1)',
          'https://example.org/rctype/type2021.1a',
          'https://example.org/rctype/type2021.1b',
        ],
        roles: [
          'Region Boundary Content Role Name (ref2021.1)',
          'https://example.org/rrole/role2021.1a',
          'https://example.org/rrole/role2021.1b',
        ],
        unit: 'relative',
        imageWidth: 2000,
        imageHeight: 1000,
        x: 0.59,
        y: 0.426,
        radius: 0.068,
      },
      {
        id: 'persltr1',
        names: ['Speaker 1'],
        shape: 'polygon',
        types: [
          'Region Boundary Content Type Name (ref2021.1)',
          'https://example.org/rctype/type2021.1a',
          'https://example.org/rctype/type2021.1b',
        ],
        roles: [
          'Region Boundary Content Role Name (ref2021.1)',
          'https://example.org/rrole/role2021.1a',
          'https://example.org/rrole/role2021.1b',
        ],
        unit: 'relative',
        imageWidth: 2000,
        imageHeight: 1000,
        vertices: [
          {
            x: 0.05,
            y: 0.713,
          },
          {
            x: 0.148,
            y: 0.041,
          },
          {
            x: 0.375,
            y: 0.863,
          },
        ],
      },
    ]);
  });

  it('can remove non-essential properties', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata()).toEqual([
      {
        id: 'persltr2',
        names: ['Listener 1'],
        shape: 'rectangle',
        unit: 'relative',
        x: 0.31,
        y: 0.18,
        width: 0.127,
        height: 0.385,
      },
      {
        id: 'persltr3',
        names: ['Listener 2'],
        shape: 'circle',
        unit: 'relative',
        x: 0.59,
        y: 0.426,
        radius: 0.068,
      },
      {
        id: 'persltr1',
        names: ['Speaker 1'],
        shape: 'polygon',
        unit: 'relative',
        vertices: [
          {
            x: 0.05,
            y: 0.713,
          },
          {
            x: 0.148,
            y: 0.041,
          },
          {
            x: 0.375,
            y: 0.863,
          },
        ],
      },
    ]);
  });

  it('can filter rectangles', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata('rectangle')).toEqual([
      {
        id: 'persltr2',
        names: ['Listener 1'],
        shape: 'rectangle',
        unit: 'relative',
        x: 0.31,
        y: 0.18,
        width: 0.127,
        height: 0.385,
      },
    ]);
  });

  it('can find roles when only one role', async () => {
    const buffer = await fs.readFile('test/fixtures/thirdparty/skater.jpg');
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata('any', 'any', false)).toEqual([
      {
        id: 'crop-e5cb8e64-b304-45fa-b56f-11fad65dac2b',
        names: [],
        shape: 'rectangle',
        roles: ['http://cv.iptc.org/newscodes/imageregionrole/cropping'],
        unit: 'relative',
        imageWidth: 1500,
        imageHeight: 1000,
        x: 0.414,
        y: 0.273,
        width: 0.156,
        height: 0.234,
      },
      {
        id: 'crop-e93caf0a-227b-44c4-a7e6-d9b949f76163',
        names: [],
        shape: 'rectangle',
        roles: ['http://cv.iptc.org/newscodes/imageregionrole/cropping'],
        unit: 'relative',
        imageWidth: 1500,
        imageHeight: 1000,
        x: 0.416,
        y: 0.232,
        width: 0.584,
        height: 0.329,
      },
      {
        id: 'crop-e7c9cd32-8c28-4a4a-8be9-b6de3bded589',
        names: [],
        shape: 'rectangle',
        roles: ['http://cv.iptc.org/newscodes/imageregionrole/cropping'],
        unit: 'relative',
        imageWidth: 1500,
        imageHeight: 1000,
        x: 0.4066666666666667,
        y: 0.199,
        width: 0.2,
        height: 0.801,
      },
    ]);
  });

  it('can filter cropping regions', async () => {
    const bufferWithoutCroppingRegions = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parserWithoutCroppingRegions = new Parser(
      bufferWithoutCroppingRegions
    );
    expect(parserWithoutCroppingRegions.getIdcMetadata('any', 'crop')).toEqual(
      []
    );

    const bufferWithCroppingRegions = await fs.readFile(
      'test/fixtures/thirdparty/skater.jpg'
    );
    const parserWithCroppingRegions = new Parser(bufferWithCroppingRegions);
    expect(
      parserWithCroppingRegions.getIdcMetadata('any', 'crop').length
    ).toEqual(3);
  });

  it('can get the size of a JPEG', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parser = new Parser(buffer);
    expect(parser.getSize()).toEqual({
      width: 2000,
      height: 1000,
    });
  });

  it("getIdcMetadata() doesn't crash when no metadata in PNG", async () => {
    const buffer = await fs.readFile('test/fixtures/no-metadata.png');
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata()).toEqual([]);
  });

  it("getIdcMetadata() doesn't crash when no regions in PNG", async () => {
    const buffer = await fs.readFile('test/fixtures/thirdparty/metapm.png');
    const parser = new Parser(buffer);
    expect(parser.getIdcMetadata()).toEqual([]);
  });

  it('can get the size of a PNG', async () => {
    const buffer = await fs.readFile('test/fixtures/no-metadata.png');
    const parser = new Parser(buffer);
    expect(parser.getSize()).toEqual({
      width: 10,
      height: 10,
    });
  });

  it('can get the size of a WebP', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/skater-no-regions.webp'
    );
    const parser = new Parser(buffer);
    expect(parser.getSize()).toEqual({
      width: 5760,
      height: 3840,
    });
  });

  it('can get the size of a WebP with no metadata', async () => {
    const buffer = await fs.readFile('test/fixtures/no-metadata.webp');
    const parser = new Parser(buffer);
    expect(parser.getSize()).toEqual({
      width: 12,
      height: 11,
    });
  });

  it('can get the XMP metadata of a PNG', async () => {
    const buffer = await fs.readFile('test/fixtures/thirdparty/metapm.png');
    const parser = new Parser(buffer);
    expect(parser.getXmpMetadata()['PersonInImage'].description).toEqual(
      'Persons Shown'
    );
  });

  it("getXmpMetadata() doesn't crash when no metadata in PNG", async () => {
    const buffer = await fs.readFile('test/fixtures/no-metadata.png');
    const parser = new Parser(buffer);
    expect(parser.getXmpMetadata()).toEqual({});
  });

  it('can get the XMP metadata of a WebP', async () => {
    const buffer = await fs.readFile('test/fixtures/thirdparty/meta.webp');
    const parser = new Parser(buffer);
    expect(parser.getXmpMetadata()['Country'].description).toEqual('England');
  });
});
