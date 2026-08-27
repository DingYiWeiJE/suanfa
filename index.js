const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // 标记与 Token 解析器（防止多行/多空格输入错位）
  const tokens = [];
  const nextToken = async () => {
    while (tokens.length === 0) {
      const line = await readline();
      if (line === undefined || line === null) return null;
      const parts = line.trim().split(/\s+/).filter(Boolean);
      tokens.push(...parts);
    }
    return tokens.shift();
  };

  const firstToken = await nextToken();
  if (firstToken === null) return;

  const n = parseInt(firstToken, 10);
  const m = parseInt(await nextToken(), 10);

  // 关键步骤 1：解析初始状态并压缩为 targetMask
  let targetMask = 0;
  for (let i = 0; i < n; i++) {
    const s = parseInt(await nextToken(), 10);
    if (s === 1) {
      targetMask |= 1 << i;
    }
  }

  // 关键步骤 2：初始化每个量子门 G_i 的作用掩码
  // 注意：编号为 1~n，masks 数组大小设为 n + 1
  const masks = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    masks[i] = 1 << (i - 1); // 必定翻转自身
  }

  // 关键步骤 3：读入 m 条纠缠关系，叠加翻转效果
  for (let i = 0; i < m; i++) {
    const x = parseInt(await nextToken(), 10);
    const y = parseInt(await nextToken(), 10);
    masks[x] |= 1 << (y - 1); // Gx 额外翻转 y
  }

  let ans = null;

  // 关键步骤 4：DFS 搜索固定长度 k 的组合
  function dfs(start, count, k, currentMask, path) {
    if (count === k) {
      if (currentMask === targetMask) {
        ans = [...path];
        return true;
      }
      return false;
    }

    // 剪枝：剩余可选元素数量不够凑齐 k 个
    if (n - start + 1 < k - count) return false;

    for (let i = start; i <= n; i++) {
      path.push(i);
      // 异或更新掩码状态：currentMask ^ masks[i]
      if (dfs(i + 1, count + 1, k, currentMask ^ masks[i], path)) {
        return true;
      }
      path.pop();
    }

    return false;
  }

  // 关键步骤 5：从 k = 0 到 n 递增尝试，确保“数量最少”
  for (let k = 0; k <= n; k++) {
    if (dfs(1, 0, k, 0, [])) {
      break;
    }
  }

  // 易错点：无解输出 -1，有解按升序空格隔开
  if (ans !== null) {
    console.log(ans.join(" "));
  } else {
    console.log("-1");
  }
})();
