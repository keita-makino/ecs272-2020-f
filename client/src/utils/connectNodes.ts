import { ShapeSetActive } from '../types/ShapeSet';
import { Node, Edge, Point } from '../types/Shapes';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { createEdge } from '../constructors/shapeConstructors';

const connectNodes = async (activeSetNodes: Node[], inactiveSetNodes: Node[]) =>
  activeSetNodes
    .map(async (item: Node, index, array) => {
      const visited = array.slice(0, index);
      if (visited.length > 0) {
        const closestNeighboringNode = await getClosestNeightboringNode(
          item,
          createShapeSet(visited, 'active') as ShapeSetActive,
          inactiveSetNodes
        );

        if (closestNeighboringNode) {
          const testEdge = createEdge(
            item.center,
            closestNeighboringNode.center
          );
          const scannedEdges = (await rerouteEdges(
            [testEdge],
            inactiveSetNodes
          )) as Edge[];
          console.log(scannedEdges);
          return scannedEdges;
        }
      }
    })
    .filter(item => item !== undefined)
    .flat();

const rerouteEdges = async (edgesToCheck: Edge[], inactiveSetNodes: Node[]) => {
  const scannedEdges = [];
  if (edgesToCheck.length === 0) return;
  let hasIntersection = true;
  let iterations = 0;

  while (hasIntersection && iterations < 100) {
    hasIntersection = false;

    while (!hasIntersection && edgesToCheck.length > 0) {
      iterations += 1;
      const edge = edgesToCheck.pop();
      if (!edge) return scannedEdges;
      const centerNode = await getCenterNodeAlongEdge(inactiveSetNodes, edge);

      if (!centerNode) {
        scannedEdges.push(edge);
        continue;
      } else {
        if (centerNode.getDistanceToEdge(edge) > centerNode.radius) {
          scannedEdges.push(edge);
          continue;
        }

        let tempBufferForMorphing = 1.65;
        let isExisted: boolean;
        let isIncluded: boolean;
        let reroutedPoint: Point;
        do {
          tempBufferForMorphing /= 1.1;
          reroutedPoint = await rerouteEdgePoint(
            centerNode,
            tempBufferForMorphing,
            edge,
            1
          );
          isExisted =
            (await isPointExist(reroutedPoint, edgesToCheck)) ||
            (await isPointExist(reroutedPoint, scannedEdges));
          isIncluded = await isPointIncluded(reroutedPoint, inactiveSetNodes);
        } while (!isExisted && isIncluded && tempBufferForMorphing > 1);

        if (!isExisted && !isIncluded && reroutedPoint) {
          edgesToCheck.push(
            createEdge(edge.start, reroutedPoint),
            createEdge(reroutedPoint, edge.end)
          );
          hasIntersection = true;
        } else {
          tempBufferForMorphing = 1.65;
          do {
            tempBufferForMorphing /= 1.1;
            reroutedPoint = await rerouteEdgePoint(
              centerNode,
              tempBufferForMorphing,
              edge,
              -1
            );
            isExisted =
              (await isPointExist(reroutedPoint, edgesToCheck)) ||
              (await isPointExist(reroutedPoint, scannedEdges));
            isIncluded = await isPointIncluded(reroutedPoint, inactiveSetNodes);
          } while (!isExisted && isIncluded && tempBufferForMorphing > 1);
          if (!isExisted && reroutedPoint) {
            edgesToCheck.push(
              createEdge(edge.start, reroutedPoint),
              createEdge(reroutedPoint, edge.end)
            );
            hasIntersection = true;
          }
        }
      }
    }
  }

  while (edgesToCheck.length > 0) {
    scannedEdges.push(edgesToCheck.pop()!);
  }

  while (scannedEdges.length > 0) {
    const edge1 = scannedEdges.pop()!;
    if (scannedEdges.length > 0) {
      const edge2: Edge = scannedEdges.pop()!;
      const combinedEdge = createEdge(edge1.start, edge2.end);
      const closestNode = await getCenterNodeAlongEdge(
        inactiveSetNodes,
        combinedEdge
      );
      if (!closestNode) {
        scannedEdges.push(combinedEdge);
      } else {
        edgesToCheck.push(edge1);
        scannedEdges.push(edge2);
      }
    } else {
      edgesToCheck.push(edge1);
    }
  }
  return edgesToCheck;
};

const isPointIncluded = async (point: Point, nodes: Node[]) =>
  await nodes.reduce(
    (prev: Promise<boolean>, curr: Node) =>
      prev ||
      point.getDistance(curr.center) < curr.radius ||
      point.getDistance(curr.center) < curr.radius,
    Promise.resolve(false)
  );

const isPointExist = async (point: Point, edges: Edge[]) =>
  await edges.reduce(
    (prev: Promise<boolean>, curr: Edge) =>
      prev ||
      point.getDistance(curr.start) < 0.001 ||
      point.getDistance(curr.end) < 0.001,
    Promise.resolve(false)
  );

const rerouteEdgePoint = async (
  node: Node,
  buffer: number,
  edge: Edge,
  wrapNormal: 1 | -1
) => {
  const internalDivision =
    edge.start.getDistance(node.center) /
    (edge.start.getDistance(node.center) + edge.end.getDistance(node.center));
  const closestPointOnEdge = edge.start
    .scale(1 - internalDivision)
    .add(edge.end.scale(internalDivision));
  const newPoint = node.center.add(
    closestPointOnEdge
      .sub(node.center)
      .scale((wrapNormal * buffer * node.radius) / node.getDistanceToEdge(edge))
  );
  return newPoint;
};

const getCenterNodeAlongEdge = async (nodes: Node[], edge: Edge) =>
  (
    await nodes.reduce(
      async (
        _prev: Promise<{
          minDistanceRatio: number;
          closestNeighboringNode?: Node;
        }>,
        curr: Node
      ) => {
        const prev = await _prev;
        const distanceRatio =
          (2 * curr.center.getDistance(edge.center)) / edge.length;
        return distanceRatio < prev.minDistanceRatio
          ? { minDistanceRatio: distanceRatio, closestNeighboringNode: curr }
          : prev;
      },
      Promise.resolve({
        minDistanceRatio: 1,
        closestNeighboringNode: undefined
      })
    )
  ).closestNeighboringNode;

const getClosestNeightboringNode = async (
  node: Node,
  visited: ShapeSetActive,
  inactiveSetNodes: Node[]
) =>
  (
    await visited.nodes.reduce(
      async (
        prev: Promise<{
          minDistance: number;
          closestNeighboringNode: Node;
        }>,
        curr
      ) => {
        const edge = createEdge(node.center, curr.center);
        const numOfInterferenceNodes = await countInterferenceNodes(
          inactiveSetNodes,
          edge
        );
        const distance = curr.center.getDistance(visited.getCenter());

        return Math.pow(distance, 2) * Math.pow(numOfInterferenceNodes + 1, 2) <
          (await prev).minDistance
          ? {
              minDistance:
                Math.pow(distance, 2) * Math.pow(numOfInterferenceNodes + 1, 2),
              closestNeighboringNode: curr
            }
          : prev;
      },
      Promise.resolve({
        minDistance: Number.POSITIVE_INFINITY,
        closestNeighboringNode: visited.nodes[0]
      })
    )
  ).closestNeighboringNode;

const countInterferenceNodes = async (inactiveSetNodes: Node[], edge: Edge) => {
  return inactiveSetNodes.reduce(
    (prev, curr) =>
      curr.getDistanceToEdge(edge) < curr.radius ? prev + 1 : prev,
    0
  );
};

export default connectNodes;
