/**
 题目描述
某微服务Q系统的日志监控平台需要分析API调用记录。日志中包含大量重复的请求记录，为了优化存储和后续分析，需要对相邻的重复请求进行合并统计。
具体规则如下：
1.日志按时间顺序排列，每条记录包含请求路径和响应时间
2.如果连续出现相同的请求路径，需要将这些记录合并为一条
3.合并后的记录需要统计该路径连续出现的次数，并保留所有响应时间的平均值
4.相同路径但被其他路径分隔的，视为不同的记录组,需要分别合并
请实现一个函数，对给定的日志数据进行去重合并处理。
输入描述
输入请求路径path数组，按时间顺序排列
输入对应的响应时间responseTimes数组(毫秒)
补充
• 0≤paths.length≤10^5
0≤responseTimes.length≤10^5
• paths.length==responseTimes.length
1≤responseTimes[i]≤10^4
• 路径长度不超过100个字符
输出描述
按顺序输出每个记录组信息，每个记录组包含以下三个元素
• 该路径在输入数组中首次出现索引
• 该路径连续出现的次数
• 该组路径的平均响应时间(向下取整)
 */

function handle(paths, responseTimes) {
    const result = [];
    let i = 0;
    
    while (i < paths.length) {
        let j = i;
        let sum = 0;
        
        // 统计连续相同路径
        while (j < paths.length && paths[j] === paths[i]) {
            sum += responseTimes[j];
            j++;
        }
        
        const count = j - i;
        result.push([i, count, Math.floor(sum / count)]);
        i = j;
    }
    
    return result;
}