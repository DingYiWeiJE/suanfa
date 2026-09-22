/**
 题目描述
1. 输入M，N两个数，则按照以下规则形成一个数列。
2. 数列的前M个元素的值为1到M
3. 从M+1个元素开始，计算逻辑为
1. 如果其前M个元素中，存在值相同的元素，则该位置上的数值等于前M个数中最大数值与最小数值之和。
2. 如果其前M个元素中，不存在值相同的元素，则该位置上的数值等于前M个数中最大的数值和最小数值之差。
请计算该数列第N个位置上的数值
补充
• 3 <= M <= 10
• 1 <= N <= 50
输入描述
输出N和M，使用，分割
输出描述
输出N位置上的数值
 */

function positionValue(m, n) {
    if (n <= m) return n;
    
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    num.length = n + 1;
    
    for (let i = m + 1; i <= n; i++) {
        const window = num.slice(i - m, i);
        const mx = Math.max(...window);
        const mn = Math.min(...window);
        const hasDup = new Set(window).size < window.length;
        num[i] = hasDup ? mx + mn : mx - mn;
    }
    
    return num[n];
}

/**
这道题的巧妙之处在于判断是否有重复元素
他是用一个set来包裹， 然后判断set的size是否小于windows.length

 */