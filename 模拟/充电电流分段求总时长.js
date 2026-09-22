/**
题目内容
电池充电过程并非恒定电流，而是遵循一定的充电曲线。给定电池容量、当前电量百分比、目标电量百分比和充电器最大输出电流，请计算充电至目标电量所需的时间。
充电曲线规则如下：
1. 当电量 < 20% 时，采用预充模式，电流为最大电流的 20%
2. 当电量≥20% 且 < 80% 时，采用恒流模式，电流为最大电流的 100%
3. 当电量≥80%时，采用恒压模式，电流随电量增加而线性衰减： 电流计算公式： current(soc)=maxCurrent×(1—(soc — 80) × 0.045)
。其中 soc 为电量百分比，该公式保证 current(80) = maxCurrent， current(100) = maxCurrent× 0.1
。每充入batteryCapacity×1%的电量，根据当前电量所在阶段确定该步进的充电电流，然后累加该步进所需的时间。由于恒压阶段电流线性变化，可使用平均电流法计算充电时间：平均电流=起始电流+结束电流2
输入描述
batteryCapacity:电池容量(mAh)，整型，范围 1000～10000
maxCurrent:充电器最大输出电流(mA)，整型，范围 500～10000
initialSOC:当前电量百分比(0～100 的整数)，整型
targetSOC：目标电量百分比(initialSOC～100 的整数)，整型
输出描述
充电至目标电量所需的时间，浮点数Q，保留一位小数(四舍五入)
 */

function solve(capacity, maxCurrent, init, target) {
    if (target <= init) return "0.0";
    
    // 单位电量（1%）对应的容量
    const unit = capacity / 100;
    
    // 各阶段电流计算函数
    const getCurrent = soc => {
        if (soc < 20) return maxCurrent * 0.2;           // 预充
        if (soc < 80) return maxCurrent;                 // 恒流
        return maxCurrent * (1 - (soc - 80) * 0.045);    // 恒压
    };
    
    let time = 0;
    
    // 逐1%步进累加（利用平均电流法）
    for (let soc = init; soc < target; soc++) {
        const startCurrent = getCurrent(soc);
        const endCurrent = getCurrent(soc + 1);
        const avgCurrent = (startCurrent + endCurrent) / 2;
        time += unit / avgCurrent;
    }
    
    return (Math.round(time * 10) / 10).toFixed(1);
}