/**
 题目内容
在日常开发中，用户输入Q的日期格式五花八门。现需要你编写一个程序，能够识别多种日期格式，将其统一输出为yyyy-mm-dd格式，并按日期递增顺序排列。
输入描述
输入为字符串数组：
字符串格式类Q型: 月/旧可能补零也可能不补零
• 斜杠分隔:2022/01/01、2022/1/1
•横杠分隔:2022-01-01、2022-1-1
注意：
1.合法年份范围： 1000~ 2100
2.输入可能包含非法格式(即非斜杠分隔或者非横杠分隔的或者横杠和斜杠混合的均为非法格式)，非法格式忽略(不参与排序和输出)
3.不同格式的输入可能解析为同一日期，相同日期只输出一次
4. 输入数组长度在 1 ~ 200 范围内，且单个字符串长度不超过 50，即单个字符串长度在 0~ 50
5.注意日期的合法性，如月份超过 12 日，二月平年有28 天，闰年有29 天等
6.年份能被4 整除且不能被100 整除，或者能被400 整除都为闰年，否则都是平年
输出描述
按日期递增顺序输出字符串数组，每个日期字符串输出yyyy-mm-dd格式的日期。月份和日期不足两位补前导零。若所有输入均非法，则输出仅包含一个元素且元素为"NULL"的字符串数组。
输入判定规则:
判断格式的优先级顺序(从高到低)：
1. 斜杠分隔：包含 /，按 yyyy/mm/dd 解析
2. 横杠分隔：包含 -，按 yyyy-mm-dd 解析
 */

function formatDates(dates) {
    const isLeap = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
    
    const parseDate = s => {
        // 确定分隔符
        const delimiter = s.includes("/") ? "/" : s.includes("-") ? "-" : null;
        if (!delimiter) return null;
        
        const parts = s.split(delimiter);
        if (parts.length !== 3) return null;
        if (!parts.every(p => /^\d+$/.test(p))) return null;
        
        const [y, m, d] = parts.map(Number);
        
        if (y < 1000 || y > 2100) return null;
        if (m < 1 || m > 12) return null;
        if (d < 1 || d > daysInMonth(y, m)) return null;
        
        return `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };
    
    const validDates = dates.map(parseDate).filter(d => d !== null);
    const uniqueDates = [...new Set(validDates)].sort();
    
    return uniqueDates.length === 0 ? ["NULL"] : uniqueDates;
}