import { ShapeSetActive } from '../types/ShapeSet';
import { Node, Edge } from '../types/Shapes';
import { createShapeSet } from '../constructors/shapeSetConstructor';
import { createEdge } from '../constructors/shapeConstructors';
import { getClosestNeightboringNode } from './getClosestNeightboringNode';
import { rerouteEdges } from './rerouteEdges';

const connectNodes = async (
  activeSetNodes: Node[],
  inactiveSetNodes: Node[]
): Promise<Edge[]> =>
  await Promise.all(
    activeSetNodes
      .map(
        async (item: Node, index, array): Promise<Edge[] | undefined> => {
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
              return scannedEdges;
            }
          }
        }
      )
      .flat()
  );

export default connectNodes;
