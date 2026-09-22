/**
 题目内容
某数据中心记录了连续Ⅳ小时内每小时的服务器负载得分，记录在数组scores中；0表示该小时无效(服务器故障)。需要选择连续W小时的窗口作为最佳的维护窗口，满足如下规则：
1. 窗口内不能包含无效小时
2.窗口满足负载得分总和最小；若存在多个，选取起始小时最早的
3.不存在满足条件的窗口时，输出「-1,0]
输入描述
N： 总小时数(1 ≤ N ≤ 100000)
W: 窗口长度(1 ≤ W ≤ min(N, 10000))
scores： 长度为 N 的数组，第 i 个值表示第 i 小时负载得分(0 ≤ scores[il ≤ 1000)
输出描述
包含2个整数的数组一[起始小时编号，最小负载总和]或「—1,0]
 */

function findBestWindows(n, w, scores) {
    let left = 0, sum = 0;
    let minSum = Infinity, bestStart = -1;
    
    for (let right = 0; right < n; right++) {
        // 遇到0，窗口作废，从下一位重新开始
        if (scores[right] === 0) {
            left = right + 1;
            sum = 0;
            continue;
        }
        
        sum += scores[right];
        
        // 保持窗口长度不超过w
        while (right - left + 1 > w) {
            sum -= scores[left];
            left++;
        }
        
        // 长度正好为w时更新最优解
        if (right - left + 1 === w && sum < minSum) {
            minSum = sum;
            bestStart = left;
        }
    }
    
    return bestStart === -1 ? [-1, 0] : [bestStart, minSum];
}