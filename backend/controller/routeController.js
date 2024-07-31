const getOptimizedRoute = (req, res) => {
    const { start, end, robots } = req.body;
  
    // Sample implementation of A* algorithm
    const astar = (start, goal) => {
      const h = (node) => Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
      const openSet = [start];
      const cameFrom = new Map();
      const gScore = new Map();
      const fScore = new Map();
      
      gScore.set(start, 0);
      fScore.set(start, h(start));
  
      while (openSet.length > 0) {
        openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
        const current = openSet.shift();
  
        if (current.x === goal.x && current.y === goal.y) {
          const path = [];
          let temp = current;
          while (cameFrom.has(temp)) {
            path.push(temp);
            temp = cameFrom.get(temp);
          }
          path.push(start);
          return path.reverse();
        }
  
        const neighbors = [
          { x: current.x + 1, y: current.y },
          { x: current.x - 1, y: current.y },
          { x: current.x, y: current.y + 1 },
          { x: current.x, y: current.y - 1 },
        ];
  
        for (const neighbor of neighbors) {
          const tentativeGScore = gScore.get(current) + 1;
          if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
            cameFrom.set(neighbor, current);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(neighbor, tentativeGScore + h(neighbor));
            if (!openSet.some((node) => node.x === neighbor.x && node.y === neighbor.y)) {
              openSet.push(neighbor);
            }
          }
        }
      }
  
      return null;
    };
  
    const startNode = { x: start.lat, y: start.lng };
    const goalNode = { x: end.lat, y: end.lng };
    const optimizedRoute = astar(startNode, goalNode).map((node) => ({ lat: node.x, lng: node.y }));
  
    res.json({ path: optimizedRoute });
  };
  
  module.exports = { getOptimizedRoute };
  