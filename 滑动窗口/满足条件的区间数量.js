/**
 题目内容
基站运维团队需要统计某区域基站的低能耗连续运行时段数目，以评估基站的节能优化效果。给定以下信息：
• 整数数组 power：power[i] 表示该基站第i小时的能耗值(单位：千瓦时)，power[i]≥ 0，能耗不会为负；• 整数 target：低能耗阈值(单位：千瓦时)，要求连续时段的总能耗不超过该阈值；
• 整数 max_hour：最大统计时长(单位：小时)，要求连续时段的时长不超过该值，且至少为1 小时。
请你统计满足以下两个条件的连续运行时段（子数组）的数目：
1. 连续时段的时长 ∈ [1, max_hour];
2. 该时段内的总能耗 ≤ target。
补充说明：
• 1 ≤ power.length ≤ 10⁵ ;
• 0 ≤ power[i] ≤ 100;
• 0 ≤ target ≤ 107;
• 1 ≤ max_hour < power.length;
• 所有能耗值非负。
输入描述
输入包含两行:
• 第一行：整数数组 power 的表示形式，如 0,0,0；
• 第二行：两个整数 target 和 max_hour，以逗号分隔，如 0,2。
输出描述
输出一个整数，表示满足条件的连续运行时段数目。
 */

function solve(power, target, maxHour) {
    let left = 0, sum = 0, ans = 0;
    
    for (let right = 0; right < power.length; right++) {
        sum += power[right];
        
        // 收缩窗口：和超过target 或 长度超过maxHour
        while (sum > target || right - left + 1 > maxHour) {
            sum -= power[left++];
        }
        
        // 以right结尾的所有合法子数组数量
        ans += right - left + 1;
    }
    
    return ans;
}

/**
ans += right - left + 1;
为什么这个可以列举出所有可能
因为 把终点 right固定不动
起点有 left  left+1   left+2 ... 一直到right
实际就是计算起点的数量， 起点的数量就是起点的数量
 */