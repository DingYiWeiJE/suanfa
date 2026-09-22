/**
题目内容
某社区有多条广播线路，每条线路用一个大写英文字母编号表示(A-Z)。当发送广播时，为减少操作次数，会将连续相邻编号且满足一定个数的线路合并为一个区间，用“起始编号-结束编号”的简写形式表示；不连续或不满足个数的线路则单独列出。合并后的结果要求按字母升序排列，各项之间用一个逗号分隔。
具体合并规则如下：
• 若连续的线路编号个数≥ 3个，则合并为一个区间，格式为 起始-结束(如 B-F表示 B、C、D、E、F五条线路)
• 若连续线路编号个数 = 2 个，不合并，仍各自单独列出 (如 AB 两个编号写成 A,B)
• 若连续线路编号个数 = 1 个，单独列出 (如 G)
• 不连续的线路之间各自处理，互不影响
输入描述
参数1：整数n，表示需要广播的线路条数
参数2：n个大写字母，空格分隔，表示发送广播的线路编号。字母可能重复，但合并时每个编号只计一次。
输出描述
一个字符串Q，表示合并后的广播线路列表，按字母升序排列，项间用逗号分隔。
约束：1 ≤ n ≤ 26，字母范围为 A-Z(仅大写)。输入字母可能有重复，需去重后排序再合并。
 */
function solve(n, s) {
    const letters = [...new Set(s.split(' '))].sort();
    
    // 将连续字母分组
    const groups = [];
    let currentGroup = [letters[0]];
    
    for (let i = 1; i < letters.length; i++) {
        if (letters[i].charCodeAt(0) === letters[i-1].charCodeAt(0) + 1) {
            currentGroup.push(letters[i]);
        } else {
            groups.push(currentGroup);
            currentGroup = [letters[i]];
        }
    }
    groups.push(currentGroup);
    
    // 处理每个组
    return groups.map(group => {
        if (group.length >= 3) {
            return `${group[0]}-${group[group.length-1]}`;
        }
        return group.join(',');
    }).join(',');
}