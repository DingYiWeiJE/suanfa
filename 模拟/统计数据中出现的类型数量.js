/**
题目内容
给定一个数组，元素为数字，数组的内容表示多个连续的TLV(tag-length-value)；关于TLV，单个TLV具备以下特征:
• tag：占位1个数组元素，代表类型；
• length：占位1个数组元素，代表长度，且长度值大于0；
• value：占位后面连续的length个数组元素；
• tlv长度限制：单个TLV所占的数组元素必须是4的倍数，不足的部分可用任意数字补齐；
• 数值取值范围 0 - 99；
例如：单个TLV数组：2130，第一个数字2是tag，第二个数字1是length，第三个数字3是value，第四个数字0是补齐；现在要求把给定的数组进行分析，解析出整个数组中存在多少种不同类型的tag，如果解析过程出现数组元素不符合规范，则返回
输入描述
1. 数组元素不超过10000
2. TLV的总数不超过1000
输出描述
解析出的不同tag类型的数量，若格式错误则输出0
 */

function countTagCategories(arr) {
    const tags = new Set();
    let i = 0;
    
    while (i < arr.length) {
        // 检查 tag 和 length 是否存在
        if (i + 1 >= arr.length) return 0;
        
        const length = arr[i + 1];
        if (length <= 0) return 0;
        
        // 计算补齐后的 TLV 总长度（4的倍数）
        const tlvLen = Math.ceil((2 + length) / 4) * 4;
        
        // 检查是否越界
        if (i + tlvLen > arr.length) return 0;
        
        // 检查所有元素范围 0-99
        for (let j = i; j < i + tlvLen; j++) {
            if (arr[j] < 0 || arr[j] > 99) return 0;
        }
        
        tags.add(arr[i]);
        i += tlvLen;
    }
    
    return tags.size;
}

/**
 * 本题的关键在于， 知道有哪些边界， 如果不符合规范， 就直接结束了
 * 还有要知道怎么获取到长度
 */