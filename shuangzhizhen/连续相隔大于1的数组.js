/**
题目内容
给定一个整数数组，请找出最长的子串，使得该子串中任意两个相邻元素的绝对差都严格大于1。输出这个最长子串的长度。例如，数组 [1，3，4，5，6，5，4] 中，子串[1，3] 满足条件(|1-3|=2>1)，且是最长的，因此答案为 2。数组长度为 n， 0 ≤ n ≤ 1000
数组范围 nums[] ， 0 ≤ nums[i] ≤ 10000
输入描述
输入为一个整数数组
输出描述
输出满足条件的最长子串的长度 
 */
function solve(nums) {
    if (nums.length === 0) return 0;
    
    let maxLen = 1, currLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        currLen = Math.abs(nums[i] - nums[i-1]) > 1 ? currLen + 1 : 1;
        maxLen = Math.max(maxLen, currLen);
    }
    
    return maxLen;
}