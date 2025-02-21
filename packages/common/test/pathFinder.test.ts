import { PathFinder } from '../src/pathFinder';

describe('PathFinder', () => {
  let pathFinder: PathFinder;

  const tiles = [
    [0, 0, 0],
    [0, -1, 0],
    [0, 0, 0]
  ];

  const terrain_types = [
    { id: 0, name: 'Ground', walkable: true },
    { id: -1, name: 'Wall', walkable: false }
  ];

  beforeEach(() => {
    pathFinder = new PathFinder(tiles, terrain_types);
  });

  test('should initialize with correct walkable map', () => {
    expect(pathFinder.worldWidth).toBe(3);
    expect(pathFinder.worldHeight).toBe(3);
    expect(pathFinder.walkable).toEqual([
      [true, true, true],
      [true, false, true],
      [true, true, true]
    ]);
  });

  test('spawnCoord should return a walkable coordinate', () => {
    const coord = pathFinder.spawnCoord();
    expect(pathFinder.isWalkable([], coord.x, coord.y)).toBe(true);
  });

  test('isWalkable should return correct values', () => {
    expect(pathFinder.isWalkable([], 0, 0)).toBe(true);
    expect(pathFinder.isWalkable([], 1, 1)).toBe(false);
    expect(pathFinder.isWalkable([], -1, 0)).toBe(false);
    expect(pathFinder.isWalkable([], 3, 3)).toBe(false);
  });

  test('generatePath should return a valid path', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 2 };
    const path = pathFinder.generatePath([], start, end, false);
    expect(path).not.toHaveLength(0);
    expect(path).toContainEqual(end);
  });

  test('generatePath should block when lacking unlock', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 2 };

    pathFinder.clearBlockingItems();
    pathFinder.setBlockingItem(2, 0, 'block');
    pathFinder.setBlockingItem(0, 2, 'block');

    const path = pathFinder.generatePath(['wrong_unlock'], start, end, false);

    expect(path).toHaveLength(0);
  });

  test('generatePath should block when having unlock', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 2 };

    pathFinder.clearBlockingItems();
    pathFinder.setBlockingItem(2, 0, 'block');
    pathFinder.setBlockingItem(0, 2, 'block');

    const path = pathFinder.generatePath(['block'], start, end, false);

    expect(path).not.toHaveLength(0);
    expect(path).toContainEqual(end);
  });

  test('generatePath should return an empty path if the goal is not walkable', () => {
    const start = { x: 0, y: 0 };
    const end = { x: 1, y: 1 }; // Blocked
    const path = pathFinder.generatePath([], start, end, false);
    expect(path).toEqual([]);
  });
});
