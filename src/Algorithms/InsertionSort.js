const insertionSort = (a) => {
  let arr = [...a]
  const animations = []

  for (let i = 1; i < arr.length; i++) {
    let keyi = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > keyi) {
      animations.push([i, j, keyi, arr[j], 0])
      animations.push([j, j + 1, arr[j], arr[j + 1], 4])
      arr[j + 1] = arr[j]
      animations.push([i, j, keyi, arr[j], 3])
      j = j - 1
    }
    arr[j + 1] = keyi
    animations.push([i, j + 1, keyi, arr[j + 1], 4])
  }

  return animations
}

export default insertionSort
