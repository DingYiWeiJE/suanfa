function handle (paths, responseTimes) {
  const result = []
  let left = 0
  while(left < paths.length) {
    let right = left
    let sum = 0
    let count = 0
    while(right < paths.length && paths[right] === paths[left]) {
      sum += responseTimes[right]
      count++
      right++
    }
    result.push([left, count, Math.floor(sum/count)])
    left = right
  }
  return result
}