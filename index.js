function analyzeTemperature(temperatures, k, t) {
  const n = temperatures.length

  const maxTemp = Math.max(...temperatures)
  const maxIndex = temperatures.indexof(maxTemp)
  let maxGap = 0
  let dangerCount = 0
  let bestStart = -1

  for (let start = 0; start + k < n; start++){
    let isIncreasing = true
    for (let i = start; i < start + k; i++) {
      if (temperatures[i] >= temperatures[i + 1]) {
        isIncreasing = false
        break
      }
    }
    if (isIncreasing) {
      dangerCount++
      const gap = temperatures[start + k - 1] - temperatures[start]
      if (gap > maxGap) {
        maxGap = gap
        bestStart = start
        
      }
    }
  }
  
  return [maxTemp, maxIndex, dangerCount, bestStart, bestEnd];

}