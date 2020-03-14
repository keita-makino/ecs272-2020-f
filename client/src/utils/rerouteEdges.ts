import { Node, Edge, Point } from '../types/Shapes';
import { createEdge } from '../constructors/shapeConstructors';
import { getCenterNodeAlongEdge } from './getCenterNodeAlongEdge';
import { rerouteEdgePoint } from './rerouteEdgePoint';
import { isPointExist } from './isPointExist';
import { isPointIncluded } from './isPointIncluded';
export const rerouteEdges = async (
  edgesToCheck: Edge[],
  inactiveSetNodes: Node[]
) => {
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
