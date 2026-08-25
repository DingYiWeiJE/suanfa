# 题型



## 滑动窗口 单调递增/递减序列

1 挪动head

2 赋值

3 先清后push

```
const deque = [0]
let head = 0

for (let i = 1; i<n; i++) {
  while (head < deque.length && deque[head] < i - k) {
  	head++
  }
  dp[i] = dp[deque[head]] + E[i]
  while (head < deque.length && dp[deque[deque.length - 1]] <= dp[i]) {
  	deque.pop()
  }
  deque.push(i)
}
```

**犯错的地方**

+ const deque = [0] 写成了 const deque = [E[0]]  deque只是保存下标的， 不是保存值
+ for循环从0 开始    应该是从1开始， 因为0 已经在前面初始化了， 如果从0开始返回会错
+ head < deque.length 是为了保证一定有值 因为在pop的时候， 是有判断deque.length > head 这个条件的， 所以不存在head = 8 而数组为[] 的情况 只会是 [1,2,3,4,5,6,7] 这个时候把后面的pop了， 而deque[head]就已经表示了队尾， 所以不可能完全清空数组



## 数位DP

参数有

+ 当前数字所在的位置
+ 上一位数字
+ 是否触达限制
+ 当前的和
+ 当前的数字字符串

函数的终点：  传入的位置 等于数字字符串的长度

因为索引是从0 开始的， 所以应该是到 length - 1 的时候结束， 所以当执行到 idx === length 的时候 ，就是应该结束了

**我在这里理不清的原因是， 没想通结束是通过再调用一次def的方式**

假设我们需要填一个长度为 `len = 3` 的数字，对应下标是 `0, 1, 2`：

- **进入 `dfs(0)`**：处理下标 `0`（第 1 位）。填完数字后，调用 `dfs(0 + 1)` 即 `dfs(1)`。
- **进入 `dfs(1)`**：处理下标 `1`（第 2 位）。填完数字后，调用 `dfs(1 + 1)` 即 `dfs(2)`。
- **进入 `dfs(2)`**：处理下标 `2`（第 3 位）。填完数字后，调用 `dfs(2 + 1)` 即 `dfs(3)`。
- **进入 `dfs(3)`**：此时 `idx = 3`，正好等于 `len`。此时 `0, 1, 2` 这 3 个位置都已经成功填入了数字，`currentPath` 中拥有了完整长度的字符串

**还有一个重要的踩坑点**

```js
let ans = "-1"
for(let len = FmaxStr.length; len >= 1; len --) {
    function dfs (idx, pre, isLimit, sum, path){
        if (idx === len) return isPrime(sum) ? path : null
        let maxD = (len === FmaxStr.length && isLimit) ? +FmaxStr[idx] : 9
        let min = idx === 0 ? 1 : pre
        
        for (let d = maxD; d >= min; d--) {
            let res = dfs(idx + 1, d, isLimit && d === maxD, path + d)
            if(res) {
                return res
            }
        }
        return null
    }
    let res = dfs(0, 1, true, 0, "")
    if (res) {
        ans = res
        return
    }
}
console.log(-1)
```

在第一个状态执行 dfs的时候， 是从0 索引开始的

所以这个时候pre是没有值的， 因为0 就是首次执行， 所以之前没有值

为什么放一个1， 是因为pre影响着下一次的最小值， 所以放了个1， 这里放任何数都行的

因为函数内部 `let min = idx === 0 ? 1: pre` 也会把值改写成1的





## 前缀技巧

```
求数组某一段的和
大量重复查询区间和
连续子数组
连续分组
```

创建方法： 前 i 个的总和 = 前 i-1 个的总和 + 当前这个

```
prefix[i] = prefix[i - 1] + array[i - 1];
```

求区间：前 i 个全部拿出来，再把前 k 个删掉，剩下的就是中间这一段。

```
prefix[i] - prefix[k]
```



## 走格子的距离

碰到从某个格子走到某个格子的最小步数

+ 创建一个`dist[m][n]` 然后全都设置为`Infinity`

+ 把`dist[startX][startY] = 0`
+ 然后在`[startX][startY]`这个地方开始搜索

```js
if (newDist < dist[nx][ny]) {
    dist[nx][ny] = newDist;

    // 1 权边放队尾
    pushBack([nx, ny]);
}
```

如果距离比之前的小， 那么就继续搜索， 否则不添加到队列当中



碰到有传送门的问题用**0-1 DFS**

也就是双端队列， deque;   right 先走，left跟上

+ 设置 left  rifht = m * n * 4 + 10
+ 让后放入初始值 deque[right++] = [startX, startY]
+ 然后 while(left < right) { const [x, y] = deque[left++]  }

碰到权重更高的， 想要下一轮优先执行的情况（传送门）

`deque[--left] = [newX, newY]`  这一步的巧妙之处是回来， 优先执行

例如 

```
deque[10] = [9, 4];
然后在循环体中执行 const [x, y] = deque[left++]; 取出数据的时候
left变成11
deque[--left] = [newX, newY] 就会把left重置成10； 
下次就能天然的最先执行了
```

left用过就废弃了； 在队列里面的是left到right



## 两个数组相互置换达到平衡

首先值得肯定的一点是两个数组的长度是一样的

**然后用一个map来统计某一个元素的diff**

+ 先走一轮A数组遍历统计， map对应的item+1
+ 然后走一轮B数组遍历统计， map对应的item -1
+ 如果一个item在两个数组中出现的次数是一样的， 那么就可以肯定， 这个元素是不需要置换的

完成diff之后

遍历for (const [num, diff] of map) {}

这里有一个重要的概念， 如果说diff的值是奇数， 那么直接结束， 因为怎么换都达不到平衡

diff是正数， 就说明是数组A中的num多出来了 diff/2个

如果diff是负数， 就说明数组B中的num多出来了 -diff/2 个 （这里为什么要加上一个-号呢？ 是为了让 除以2之后的数是正数）

**重要的一步来了**

创建一个数组 a=[]  b = []

然后在遍历map的时候。 把A多出来的元素放到a中， 把B多出来的元素放到b中； for(let i = 0; i < diff/2 ; i++)

**注意，a数组的长度和b数组的长度百分之百会相等** 因为A都出来了n个与B不一样的元素， 那么B必然有n个元素是A没有的

如果a.length === 0 直接结束，不需要置换， A和B没有需要置换的元素



## 编辑距离

两个字符串要经过最少的修改次数， 才达到一模一样

```js
const dp = Array.from({length: source.length + 1}, () => new Array(target.length + 1).fill(Infinity))
for (let i = 0; i <= source.length; i++) {
  dp[i][0] = i
}
for (let i = 0; i <= target.length; i++) {
  dp[0][i] = i
}
for(let sourceIndex = 1; sourceIndex <= source.length; sourceIndex++) {
  for (let targetIndex = 1; targetIndex <= target.length; targetIndex++) {
    const a = dp[sourceIndex - 1][targetIndex - 1]
    const b = dp[sourceIndex - 1][targetIndex]
    const c = dp[sourceIndex][targetIndex - 1]

    if (source[sourceIndex - 1] === target[targetIndex - 1]) {
      dp[sourceIndex][targetIndex] = a
    } else {
      dp[sourceIndex][targetIndex] = Math.min(a,b,c) + 1
    }
  }
}
dp[source.length][target.length] // 这就是编辑距离
```



# 补课

## 位运算

### 与 &

**判断某一位是不是1**

例如：

```
n & 1
```

判断最低位：

```
1010 & 0001

=0
```

偶数。

```
1011 & 0001

=1
```

奇数。

### 或|

只要一个是1，就是1。

用途是将某一位数设置为1



### 异或^

不同是1， 相同是0



### 左移 <<

相当于乘2



### 位运算题型

#### 求连续 1

```js
let max = 0;
while (n !== 0) {

    n = n & (n >> 1);

    max++;

}
```



#### 判断奇偶性

```
n & 1 === 1
```

#### 去掉最低位的1

```
n & (n-1)
```

统计1的数量

```js
let count = 0;

while(n !== 0){

    n = n & (n-1);

    count++;

}
```

**注意**

`n & (n-1)` 不是让数字减2，而是把二进制最低位的那个1变成0。它减少多少，取决于最低位1后面有没有0。

#### 判断第k位是0还是1

```
(n >> k) & 1
```

先向右移动K次， 然后第K位置就到最后一位了， 再&运算就能知道是0还是1



### 掩码

**注意， 位数是从右边算起的**

**翻转/切换状态（XOR `^`）**

上一题量子门的翻转效果就是掩码。例如掩码 `0101` 代表“翻转第 0 位和第 2 位”：

`0011 ^ 0101 = 0110`（第 0 位 $1 \to 0$，第 2 位 $0 \to 1$）。

**查询某一位（AND `&`）**

想检查第 2 位是否处于开启状态，用掩码 `0100` 计算：

`0110 & 0100 = 0100`（结果不为 0，说明第 2 位是 `1`）。

**开启某一位（OR `|`）**

强制把第 1 位置为 `1`，使用掩码 `0010`：

`0100 | 0010 = 0110`。

**关闭某一位（AND NOT `& ~`）**

强制把第 2 位置为 `0`：

`0110 & ~0100 = 0010`。

## 正则表达式

+ 连续的字母  `/[a-zA-Z]+/`

  + 也可以是`/[a-zA-Z]{1,}/`

+ 连续的非字母`/[^a-zA-Z]+/`

+ 非字母，非数字`/[^a-zA-Z0-9]/` 符号可以取这个

+ 连续的空格 `/\s+/`

+ 替换

  + ```js
    console.log(line.replace(/\d+/g, '*$&*'))
    // $&很特殊， 它是replace的一个变量， 表述匹配到的原本的字符串； 注意，这里可不是模板字符串， 而是普通的引号
    ```

    如果想输出：

    ```
    $&123$&
    ```

    应该：

    ```
    console.log(
      "abc123def".replace(/\d+/g, "$$&$&$$&")
    )
    ```




## 字符串

string.slice(包前不包后)

substring(包前不包后)



## 数字

### 概念

+ 素数： 也叫（**质数**）， 除了**1 和它本身**之外，不能被其他任何整数整除的数

  + ```js
    function isPrime(num) {
      if (num < 2) return false;
      if (num === 2) return true;
      if (num % 2 === 0) return false;
      for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }
    ```

  

+ 合数： 不是质数就是合数



### api

+ 四舍五入   Math.round()
+ 幂运算 Math.pow(5, 3)  也可以写成 5 ** 3 // 125
  + 求某一个数的千分位 ：  例如 493822 结果应该是3822      n%Math.pow(10, 4) 就能得到3822 了

+ 开平方 Math.sqrt(16)    // 4
+ 最大的安全数 Number.MAX_SAFE_INTEGER
+ 正无穷大： Infinity



## map

遍历

```
map.forEach((value, key) => {}  // 注意， 是value先， key后
```



## set

创建set

```
const set = new Set([...array1, ...array2

])
```

### 