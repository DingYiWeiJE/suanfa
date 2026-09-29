/**
题目内容
某公司机房部署Q了编号为0 - n-1的n台路由器，用于组成公司网络。
网络工程师通过网桥桥接路由器两两链接，网络连通性具备传递性:如果A和B连通，B与C连通，那么A与C也可通过B进行连通。
现在网络管理员需要进行连通性测试，指定测试的一台路由器，给出有多少路由器与它连通(不包含自身)
输入描述
• 整型数字，表示路由器数n 1 <= n <= 10000
• 二维数组，每个数组表示两个路由器连通关系，如1,2表示1，2两个路由器连通。
• 整型数字，需要测量的指定路由器编号
输出描述
与指定机房路由器连通的路由器数量(不包含本身)

这就是在查找某一个端口， 连通到的端口有哪些
 */

function solve(n, edges, target) {
  const parent = Array.from({length: n}, (_, i) => i)

  function find(i) {    
    while(parent[i] !== i) {
      parent[i] = parent[parent[i]]
      i = parent[i]
    }
    return i 
  }

  function union (x,y)  {
    const rootx = find(x)
    const rooty = find(y)
    if (rootx !== rooty) {
      parent[rootx] = rooty
    }
  }

  for(const [u, v] of edges) {
    union(u,v)
  }

  const root = find(target)
  let count = 0
  for (let i = 0; i < n; i++) {
    if (find(i) === root) {
      count++
    }
  }

  return count - 1
}
