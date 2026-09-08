/**
题目内容
请在一个仅由数字组成的字符串中，找出只由6 或8组成的最长的连续子串。
输入描述
输入一个仅由数字组成的字符串，字符串长度小于256。
输出描述
请输出所有满足要求的最长子串，去重后按照字典序排序输出；当字符串为空或没有符合要求的子串时，输出空字符串。
 */

function solve(str) {
    const matches = str.match(/[68]+/g) || [];
    if (!matches.length) return '';
    const maxLen = Math.max(...matches.map(m => m.length));
    return [...new Set(matches.filter(m => m.length === maxLen))].sort().join(',');
}