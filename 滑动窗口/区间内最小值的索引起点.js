/**
 题目内容
给定—个—维数组QpriceArray，表示未来priceRecords小时内每小时的电价（单位：分/kWh)。找出充电成本最低的连续hours个小时时间段的开始时刻点。
若存在多种成本最低方案，优先返回最低成本方案的最早的时刻点。
输入描述
• 参数1：整数priceRecords，表示电价记录数量
• 参数2：整数hours，表示连续小时数
•参数3：—维数组 priceArray，表示每小时的电价 price1～priceN，以空格分隔
• 约束条件: 1 ≤ priceRecords ≤ 24, 1 ≤ hours ≤ priceRecords, 1 ≤ price1 ~ priceN ≤ 100
输出描述
返回一个整数，表示最优充电时段的起始索引（从0开始）。
 */

function solve(priceRecords, hours, prices) {
    // 先计算第一个窗口的和
    let sum = 0;
    for (let i = 0; i < hours; i++) {
        sum += prices[i];
    }
    
    let minSum = sum;
    let result = 0;
    
    // 滑动窗口
    for (let i = hours; i < priceRecords; i++) {
        sum = sum - prices[i - hours] + prices[i];
        if (sum < minSum) {
            minSum = sum;
            result = i - hours + 1;
        }
    }
    
    return result;
}