/**
 题目内容
给定一个仅由小写英文字母组成的字符串s，请判断它是否可以在删除一个字符之后，变成一个回文串。回文串的定义是：从左到右读和从右到左读完全相同。
如果可以，输出一个数组，数组由可删除字符的索引值构成；否则输出一个空数组。
输入描述
输入—个字符串 s， 2 ≤ s.length ≤ 105
输出描述
输出一个数组，内容为：Ⅳ种删除方法的字符索引值。如输入为：abca，则输出为：[1，2]，代表可以有两种删除方式：aba，aca] o
• 1：删除索引值为 1 的字符，即删除字符 b，则变为：aca，属于回文
• 2：删除索引值为 2 的字符，即删除字符c，则变为：aba，属于回文
 */

/**
双指针，两端走，
相等继续不相等停。
已经回文找中心，
不是回文删两边。
 */

function resolve (s) {
  const n = s.length
  function isHuiWen (left, right) {
    while(left < right) {
      if(s[left] !== s[right]) return false
      left++
      right--
    }
    return true
  }

  let left = 0, right = n - 1
  while(left < right && s[left] === s[right]) {
    left++;
    right--
  }
  const result = []
  if (left >= right) { // 原本就是回文字符串
    const mid = Math.floor(n/2)
    let start = mid, end = mid;
    while(start > 0 && s[start - 1] === s[mid] ) start-- // 开端向左扩张
    while(end < n - 1 && s[end + 1] === s[mid]) end++ // 尾步向右扩张
    for(; start <= end; start++) {
      result.push(start) // 每一个与中间相等的索引都可以去掉
    }
    return result
  }

  if (isHuiWen(left + 1, right)) result.push(left) // 把左边去掉， 剩下的能不能形成回文字符串
  if (isHuiWen(left, right - 1)) result.push(right) // 把右边去掉， 看剩下的能不能形成回文字符串
  return result
}