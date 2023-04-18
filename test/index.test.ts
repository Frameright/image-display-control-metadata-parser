import { Parser } from '../src';
import { promises as fs } from 'fs';

describe('Parser', () => {
  it('can get all image regions', async () => {
    const buffer = await fs.readFile(
      'test/fixtures/thirdparty/IPTC-PhotometadataRef-Std2021.1.jpg'
    );
    const parser = new Parser(buffer);
    expect(parser.getIDCMetadata()).toEqual([
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
        radius: null,
        vertices: [],
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
        width: null,
        height: null,
        radius: 0.068,
        vertices: [],
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
        x: null,
        y: null,
        width: null,
        height: null,
        radius: null,
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
    expect(parser.getIDCMetadata('rectangle')).toEqual([
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
        radius: null,
        vertices: [],
      },
    ]);
  });
});

describe('Parser', () => {
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

  it('can get the size of a PNG', async () => {
    const buffer = await fs.readFile('test/fixtures/no-regions.png');
    const parser = new Parser(buffer);
    expect(parser.getSize()).toEqual({
      width: 10,
      height: 10,
    });
  });
});
