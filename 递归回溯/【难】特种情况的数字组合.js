/**
问题：从 [1, n] 中选 k 个不重复的数，要求：
  对于任意连续三个数 a, b, c：
  |a - b| < |b - c|

DFS 回溯：
  1. 按 1~n 顺序枚举，天然满足字典序
  2. 用 used 数组标记已选数字
  3. 加入新数字时，检查最近两个差值是否递增
  4. 到达长度 k 时，记录答案
 */
function main (n, k) {
  const visited = Array.from({length: n + 1}).fill(false)
  const ans = []

  function dfs (path) {
    if (path.length === k) {
      ans.push(path.join('-'))
      return
    }

    for (let i = 1; i <= n; i++) {
      if (visited[i]) continue

      // 这个地方是放条件的， 判断当前值是否满足添加的条件， 如果满足就进行， 不满足就continue
      // 检查最近两个数的差值是否递增
      // 这里的意思是， 当元素超过两个的时候， 这时候再放进来一个元素， 就要对这个元素的合法性进行判断的
      const m = path.length;
      if (m >= 2 && Math.abs(path[m-2] - path[m-1]) >= Math.abs(path[m-1] - i)) {
          continue;
      }
      path.push(i)
      visited[i] = true
      dfs(path)
      path.pop()
      visited[i] = false
    }
  }

  dfs([])
  


  return (ans.join('\n'))
}

console.log(main(3,3))

/**
3 3
2 1 3
2 3 1
 */