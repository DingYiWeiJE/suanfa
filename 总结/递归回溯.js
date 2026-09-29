//#region 全排列
function permute(nums) {
  const res = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    // 终止条件：路径长度等于原数组长度
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;        // 剪枝：已用过
      used[i] = true;               // 做选择
      path.push(nums[i]);
      backtrack();                  // 递归
      path.pop();                   // 撤销选择
      used[i] = false;
    }
  }

  backtrack();
  return res;
}

console.log(permute([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

//#region 子集

function subsets(nums) {
  const res = [];
  const path = [];

  function backtrack(start) {
    res.push([...path]); // 每个节点都是答案，先收集

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);      // 做选择
      backtrack(i + 1);        // 递归，从 i+1 开始避免重复
      path.pop();              // 撤销选择
    }
  }

  backtrack(0);
  return res;
}

console.log(subsets([1, 2, 3]));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]