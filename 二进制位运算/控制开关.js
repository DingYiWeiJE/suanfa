/**
题目描述
有一个8位LED控制器，包含8个LED灯(编号0-7)，初始状态全灭，用8位二进制表示为:00000000。控制器可以接收以下三种指令:
• Lx:L表示点亮操作，x表示LED的编号(0一7)，操作得到的结果是:点亮第x个LED灯，把状态设为1。
• Dx:D表示熄灭操作，x表示LED的编号(0-7)，操作得到的结果是:熄灭第x个LED灯，把状态设为0。
• Tx:T表示切换操作，x表示LED的编号(0-7)，操作得到的结果是:切换第x个LED灯的状态，若状态为0则变为1，为1则变为0。
现在给定一组指令字符串(0<=长度<=1000)，按照顺序解析并执行所有的指令，并返回最终8位二进制对应的整数值。例如:“L0L1L2T1“操作表示:点亮LED0，点亮LED1，点亮LED2，切换LED1，最终二进制00000101,应整数5。
输入描述
给定一组指令字符串(0<=长度<=1000)
输出描述
返回最终8位二进制对应的整数值
 */

function controlInstruct(instruct) {
    let bits = 0;
    
    for (let i = 0; i < instruct.length; i += 2) {
        const c = instruct[i];
        const pos = instruct[i + 1] - '0';
        
        if (c === 'L') bits |= (1 << pos);
        else if (c === 'D') bits &= ~(1 << pos);
        else if (c === 'T') bits ^= (1 << pos);
    }
    
    return bits;
}

/**
 ^=   相同的是1  不相同的是0； 这样
 */