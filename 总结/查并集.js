function solve(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);

  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (x, y) => { parent[find(x)] = find(y); };

  for (const [a, b] of edges) union(a, b);

  // 统计连通分量个数 (其实也就是查看有多少个跟节点)
  let count = 0;
  for (let i = 0; i < n; i++) if (find(i) === i) count++;
  return count;
}