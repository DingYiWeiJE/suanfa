/**
 题目内容
仓库中有若干类Q物品，每类物品都有一个类别编号(整型)。年底进行仓库盘点，统计每类物品的件数，按照件数从多到少的顺序为物品排序，整理完毕输出物品编号序列。
输入描述
串物品类别编号，每个编号对应该类物品的一次入库，它是按照入库先后排列的。
输出描述
整理后的物品编号序列。
补充说明：
1. 如果物品的件数相同，则按照物品首次入库的先后顺序排列。
2. 物品种类不超过 10，所有物品的总件数不超过 100。
 */


function statisticsProduct(nums) {
    const count = new Map();
    const firstIndex = new Map();
    
    nums.forEach((id, i) => {
        count.set(id, (count.get(id) || 0) + 1);
        if (!firstIndex.has(id)) firstIndex.set(id, i);
    });
    
    return [...count.keys()].sort((a, b) => 
        count.get(b) - count.get(a) || firstIndex.get(a) - firstIndex.get(b)
    );
}