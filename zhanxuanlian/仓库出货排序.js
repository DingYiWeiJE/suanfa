/**
 题目内容
某仓储中心中有一个货物堆放区，货物编号按乱序堆叠存放，只能从顶部取货(后进先出)，管理员需要将货物按编号从小到大取出。仓库设有1个临时区，可将主库顶部货物依次转移到临时区，临时区也为堆叠存放(后进先出）；主库或临时区顶部货物均可直接出库；其他操作(包括主库→临时区和临时区→主库)均为“暂存”操作；请计算至少需要多少次暂存操作，能保证所有货物按编号从小到大依次出库。
补充说明：
• 临时区有且只有一个
• 出库顺序必须是严格升序，每件出库货物的编号必须大于前一件
•题目保证所有货物编号互不重复(可能为负数，编号数字不保证连续)
•题目保证总能找到一种合法的操作方案完成有序出库
输入描述
参数 1：—个整数 n (1 < n < 1000)，表示货物的总数量。
参数2：整数数组 Q a1， a2，..., an （—1000 < ai < 1000)，表示货物的编号，从左到右依次对应货物堆底部到顶部。
输出描述
个整数，表示最少暂存操作次数。
 */
function solve(a) {
    const n = a.length;
    const main = [...a];          // 主库，栈顶在数组末尾
    const temp = [];              // 临时区
    const sorted = [...a].sort((a, b) => a - b);
    const pos = new Map();        // 记录元素在哪个区：0=主库，1=临时区
    
    a.forEach(x => pos.set(x, 0));
    
    let ans = 0;
    
    for (const target of sorted) {
        if (pos.get(target) === 0) {
            // 目标在主库，把主库顶部元素移到临时区，直到目标在顶部
            while (main[main.length - 1] !== target) {
                const top = main.pop();
                temp.push(top);
                pos.set(top, 1);
                ans++;
            }
            main.pop();  // 目标出库
        } else {
            // 目标在临时区，把临时区顶部元素移回主库，直到目标在顶部
            while (temp[temp.length - 1] !== target) {
                const top = temp.pop();
                main.push(top);
                pos.set(top, 0);
                ans++;
            }
            temp.pop();  // 目标出库
        }
    }
    
    return ans;
}