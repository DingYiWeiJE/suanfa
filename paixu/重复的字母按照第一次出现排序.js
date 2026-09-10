/**题目内容
你是某连锁酒店的数据分析Q师，酒店每天都会用一串编码记录各分店收到的服务请求类型，编码由小写字母组成[a-z]，每个字母代表
一种特定类型的服务请求(如a-客房清洁、b-设备维修、c-餐饮服务等等)。为了优化资源分配，总部需要找出在当天内重复出现的服务类型，并按照它们首次出现的时间顺序生成报告。
现在给定一个服务记录字符串record(仅包含小写字母a-z)，请找出所有出现超过一次的服务类Q型，并将这些服务类型按照它们在记录中第一次出现的顺序放入结果列表中，如果没有服务类型重复出现，返回空列表。
补充说明
备注：结果只列出符合条件的服务类型的编号a-z，编号的顺序按照第一次出现的顺序排列。
输入描述
输入为一个字符串record，仅包含小写字母a-z。
输出描述
输出为一个列表，包含所有出现超过一次的服务类型的编号（a-z)，按首次出现的顺序排列；若无重复类型，输出空列表。
 */

function findRepeateService(record) {
    const seen = new Set();
    const repeated = new Set();
    
    for (const char of record) {
        if (seen.has(char)) {
            repeated.add(char);
        } else {
            seen.add(char);
        }
    }
    
    // 按首次出现顺序排序
    return [...repeated].sort((a, b) => record.indexOf(a) - record.indexOf(b));
}