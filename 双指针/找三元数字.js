/**
题目内容
给定一个包含 n 个整数的数组 nums 和一个整数 target，请从数组中找出所有 不重复的三元组[nums[i], nums[j],nums[k]]，满足以下两个条件：
1. 和为目标:
nums[i] + nums[j] + nums[k] = target
2. 奇偶性约束：
三个元素中至少有两个是奇数。
返回所有满足条件的不重复三元组。
提示：
• 3 ≤ nums.length ≤ 3000
• −105 < nums[i] < 105
补充说明
返回值输出格式：每个子数组内部的元素按数值升序排列，所有子数组之间按字典序升序排列（即先比较第一个元素，若相同再比较第二个，以此类推）。
示例：[[-1,-1,2],[-1,0,1]]
输入描述
输入为—个数组 nums和一个目标整数 target。
输出描述
输出所有满足条件的不重复三元组。
 */

function threeSum(nums, target) {
    nums.sort((a, b) => a - b);  // 1. 排序
    const res = [];              // 2. 存储结果
    
    for (let i = 0; i < nums.length - 2; i++) {  // 3. 固定第一个数
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // 4. 跳过重复
        
        let left = i + 1, right = nums.length - 1;  // 5. 双指针
        
        while (left < right) {  // 6. 双指针查找
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum < target) left++;           // 7. 和太小，左指针右移
            else if (sum > target) right--;     // 8. 和太大，右指针左移
            else {  // 9. 找到目标组合
                const oddCount = (nums[i] % 2) + (nums[left] % 2) + (nums[right] % 2);
                if (oddCount >= 2) {
                    res.push([nums[i], nums[left], nums[right]]);
                }
                left++;
                right--;
                // 跳过重复元素
                while (left < right && nums[left] === nums[left - 1]) left++;
                while (left < right && nums[right] === nums[right + 1]) right--;
            }
        }
    }
    return res;
}