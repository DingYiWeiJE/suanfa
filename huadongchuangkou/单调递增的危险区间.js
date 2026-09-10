/**
 题目内容
新能源Q电站配备了多个温度传感器，用于监测关键设备的运行温度，需要定期分析温度数据：找出历史最高温度记录，并检测是否存在温度异常升高的危险时段。
“危险时段”定义为一段连续k个时间点的温度严格单调递增，且该时段内温度升高总幅度≥阈值t，这样的时段被标记为设备存在过热风险。
给定一个整数数组temperatures，其中 temperatures[i]表示第i个时间点的温度记录，请完成以下任务：
1. 找出最高温度值及其首次出现的下标位置
2.统计所有“危险时段”的数量
3.找出温度升高幅度最大的“危险时段”的起始和结束位置
输入
temperatures: int[]，温度记录序列, 1 ≤ 长度 ≤ 10000, -100 ≤ temperatures[i] ≤ 100
• k： int，危险时段所需的连续点数， 2 ≤ k ≤ temperatures.length
t： int，连续升高的温度差值阈值， 0 < t ≤ 100
输出
int\]，长度为5的数组：[最高温度值，最高温度首次出现下标，危险时段数量，最大危险时段起始位置，最大危险时段结束位置]
补充说明
• 严格单调递增： temperatures[i] < temperatures[i+1] < ... < temperatures[i+k-1]
• 若无危险时段，起始和结束位置均返回-1
• 若多个危险时段升高幅度相同且最大，取起始位置最小的那个
• 下标从 0 开始计数
 */

function analyzeTemperature(temperatures, k, t) {
    const n = temperatures.length;
    
    // 1. 找最高温度
    let maxTemp = Math.max(...temperatures);
    let maxIndex = temperatures.indexOf(maxTemp);
    
    let dangerCount = 0;
    let maxAmplitude = -1;
    let bestStart = -1;
    
    // 2. 遍历所有长度为k的窗口
    for (let start = 0; start <= n - k; start++) {
        let isIncreasing = true;
        
        // 检查是否严格递增
        for (let i = start; i < start + k - 1; i++) {
            if (temperatures[i] >= temperatures[i + 1]) {
                isIncreasing = false;
                break;
            }
        }
        
        if (isIncreasing) {
            const amplitude = temperatures[start + k - 1] - temperatures[start];
            if (amplitude >= t) {
                dangerCount++;
                if (amplitude > maxAmplitude) {
                    maxAmplitude = amplitude;
                    bestStart = start;
                }
            }
        }
    }
    
    const bestEnd = bestStart === -1 ? -1 : bestStart + k - 1;
    return [maxTemp, maxIndex, dangerCount, bestStart, bestEnd];
}