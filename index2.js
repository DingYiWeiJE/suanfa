const [n, m] = [3, 4]
const initial = [1,1,1]

let targetMask = 0

for (let i = 0; i < n; i++) {
  if (initial[i] === 1) [
    targetMask |= (1 << i)
  ]
}

const masks = new Array(n + 1).fill(0)

for(let i = 1; i <= n; i++) {
  masks[i] = (1 << (i - 1))
}

for (let i = 0; i < m; i++) {
  const [x, y] = edge
  masks[x] |= (1 << (y - 1))
}

let ans = null

function dfs (start, count, k, currentMask, path) {
  if (count === k) {
    if (currentMask === targetMask) {
      ans = [...path]
      return true
    }
  }

  if (n - start + 1 < k - count) return false

  for (let i = start; i <= n; i++) {
    path.push(i)
    if(dfs(i+1, count+1, currentMask ^ masks[i], path)) {
      return true
    }
    path.pop()
  }
  return false
}

for (let k = 0; k <= n; k++) {
  if (def(1, 0, 0,[])) {
    break
  }
}