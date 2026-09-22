/**
 题目描述
有一个键盘有2个按键失灵了，按下这些键时会连续输出其他键对应的字符两次。具体如下：
• 按下 j键一次，屏幕上显示 u(两个连续的 u);按下 b键一次，屏幕上显示 t(两个连续的 t)
• u键和 t键是好的，按下 u键一次时，屏幕只会显示一次 u(正常按键)；按下 键一次时，屏幕只会显示一次t (正常按键)
• 假定屏幕上连续显示两个t一定是按了一次b 键，而不是两次 t键；假定按键t之后不会紧接着按键b，即tttt转义为两个 b，而不可能是 tbt；u和 j同样适用该规则
• 其它按键也都正常工作
为了方便维修，给定一串屏幕上输出的字符串，维修师傅要求按照按键次数降序输出，次数相同的按键按照对应字符的升序排序(失灵按键以原对应字符来排序)，只统计按键次数大于0的按键。
同时维修师傅要求输出时需要进行一次转义(字符映射)，规则如下:
• 按键0~9，直接以数字0~9进行输出
• 按键 a~ z，以 10~ 35 进行输出
输入描述
一个字符串s，只包含小写字母和数字，ss的长度不超过 500(s 中不包含 b和 j字母)
补充
按键范围只包括:数字0~9和小写字母a~z且不包含b和j。
输出描述
按键转义后的值，按键次数构成结果对，所有按键的结果对按照按键次数降序排列。
 */

function count(s) {
    const getKeyNum = c => /[0-9]/.test(c) ? +c : c.charCodeAt(0) - 87;
    const map = new Map();
    
    for (let i = 0; i < s.length; ) {
        if (s[i] === 'u' && s[i + 1] === 'u') {
            map.set('j', (map.get('j') || 0) + 1);
            i += 2;
        } else if (s[i] === 't' && s[i + 1] === 't') {
            map.set('b', (map.get('b') || 0) + 1);
            i += 2;
        } else {
            map.set(s[i], (map.get(s[i]) || 0) + 1);
            i++;
        }
    }
    
    return [...map]
        .map(([k, v]) => [getKeyNum(k), v])
        .sort((a, b) => b[1] - a[1] || a[0] - b[0]);
}

/**
 这题的巧妙之处是把for循环的i++放到循环体中执行了
 */


 function count(s) {
    // 字符转数字：0-9 → 0-9，a-z → 10-35
    const getKeyNum = c => /[0-9]/.test(c) ? +c : c.charCodeAt(0) - 87;
    
    // 替换失灵按键：uu → j, tt → b
    const str = s.replace(/uu/g, 'j').replace(/tt/g, 'b');
    
    // 统计每个按键的出现次数
    const map = new Map();
    for (const c of str) {
        map.set(c, (map.get(c) || 0) + 1);
    }
    
    // 转义 + 排序
    return [...map]
        .map(([k, v]) => [getKeyNum(k), v])
        .sort((a, b) => b[1] - a[1] || a[0] - b[0]);
}