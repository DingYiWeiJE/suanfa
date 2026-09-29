/**
输入描述
包含 3 个长度相同的数组，长度即订单数量N(1 ≤ N ≤ 500)，数组定义如下:
• times： 表示每个订单需要的耗时 (天) ，1 ≤ times[i] ≤ 109。
• deadlines： 表示每个订单的截止日期，1 ≤ deadlines[i] ≤ 109。
• profits: 表示每个订单对应的报酬， 1 ≤ profits[i] ≤ 109。
输出描述
输出一个整数，表示能够获得的最大的总报酬。

描述： 就是摄影师应该选择接哪些单，让自己在完成订单的前提下， 受益最大化

注意， 这里用了一个new map 来创建一个新的中间态， 它是有必要存在的
不能直接篡改原map的原因是， 会毁了这一次可能不是最佳答案， 但是有可能会和后面的task组合成最佳答案的情况
在最后sort了一下， 就能够得到， 同样花销的时间内， 收益最大的情况， 然后下次是基于这个情况去做组合的
所以， 中间map是有必要存在的

 */

function solve(duration, deadline, profit) {
    const tasks = duration.map((d, i) => ({
        d,
        dl: deadline[i],
        p: profit[i]
    })).sort((a, b) => a.dl - b.dl);

    // states: Map<总耗时, 最大收益>
    let states = new Map([[0, 0]]);

    for (const { d, dl, p } of tasks) {
        const next = new Map(states);

        for (const [time, val] of states) {
            const newTime = time + d;
            if (newTime <= dl) {
                next.set(newTime, Math.max(next.get(newTime) ?? 0, val + p));
            }
        }

        // 删除被支配状态：时间更大但收益更小的状态
        const sorted = [...next].sort((a, b) => a[0] - b[0] || b[1] - a[1]);
        const cur = new Map();
        let maxProfit = -1;

        for (const [time, val] of sorted) {
            if (val > maxProfit) {
                cur.set(time, val);
                maxProfit = val;
            }
        }

        states = cur;
    }

    return Math.max(...states.values());
}