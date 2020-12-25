const bubbleSort = (a) => {
  let arr = [...a]
  const animations = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([j, j + 1, arr[j], arr[j + 1], 0])
      if (arr[j] > arr[j + 1]) {
        animations.push([j, j + 1, arr[j], arr[j + 1], 1])
        //animations.push([j, j + 1, arr[j], arr[j + 1], 1])
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      } else {
        animations.push([j, j + 1, arr[j], arr[j + 1], 2])
      }
      animations.push([j, j + 1, arr[j], arr[j + 1], 3])
    }
  }

  return animations
}

export default bubbleSort
