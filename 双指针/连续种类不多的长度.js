/**
题目内容
某智慧园区管理系统Q记录了N 个连续的能源使用时段，每个时段使用的能源类Q型用整数表示（1=太阳能，2=风能，3=电能，4=天然气，5=地热能）。
为了优化能源配置，管理员需要分析：在这N个时段中，连续使用不超过2种能源的最长时段长度是多少？请编写程序计算这个最大长度。
输入描述
• 输入是一个整数数组，表示各时段的能源类型
•数组元素：1=太阳能，2=风能，3=电能，4=天然气，5=地热能
• 约束条件： 1 ≤ 数组长度≤100000，能源类型为1-5 的整数
输出描述
输出最长连续时段的长度。
补充说明：
如果输入为空，则输出0
 */

function getMaxLen(type) {
    if (!type || type.length === 0) return 0;
    
    const window = new Map();  // 存储当前窗口内每种能源的出现次数
    let left = 0;              // 窗口左指针
    let maxLen = 0;           // 记录最大长度
    
    for (let right = 0; right < type.length; right++) {
        // 1. 将当前元素加入窗口
        window.set(type[right], (window.get(type[right]) || 0) + 1);
        
        // 2. 如果窗口内能源种类超过2种，收缩窗口
        while (window.size > 2) {
            const leftVal = type[left];
            window.set(leftVal, window.get(leftVal) - 1);
            if (window.get(leftVal) === 0) window.delete(leftVal);
            left++;
        }
        
        // 3. 更新最大长度
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}