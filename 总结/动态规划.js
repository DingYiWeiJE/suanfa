//#region 爬楼梯
function dp(n) {
  // 1. 定义：dp[i] 表示到达第 i 阶的方法数
  const dp = new Array(n + 1);

  // 2. 初始化边界
  dp[0] = 1;
  dp[1] = 1;

  // 3. 转移 + 遍历
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

//#region 最短路线
function dp(grid) {
  const m = grid.length, n = grid[0].length;
  // 1. 定义：dp[i][j] 表示到达 (i,j) 的某种最优值
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // 2. 初始化第一行/第一列
  dp[0][0] = grid[0][0];
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

  // 3. 转移
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}