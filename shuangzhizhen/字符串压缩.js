/**
 题目内容
给定一个只包含大小写英文字母的字符串，请实现字符串压缩编码功能。压缩规则：
• 如果字符连续出现次数大于1，则用字符加上出现次数表示• 如果字符连续出现次数等于1，则直接输出字符
输入描述
• 输入—行，包含—个字符串 str(长度 1 ≤ str| ≤ 1000)• 字符串只包含大小写英文字母
输出描述
输出压缩后的字符串
 */

function compressStr(str) {
    let result = '';
    let i = 0;
    
    while (i < str.length) {
        let j = i;
        while (j < str.length && str[j] === str[i]) j++;
        
        const count = j - i;
        result += str[i] + (count > 1 ? count : '');
        i = j;
    }
    
    return result;
}