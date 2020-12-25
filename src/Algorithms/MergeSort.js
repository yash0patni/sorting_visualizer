const mergeSort = (a) => {
  let arr = [...a]
  const animations = []

  mergeSortRec(arr, 0, arr.length - 1, animations)

  return animations
}

const mergeSortRec = (arr, l, r, animations) => {
  if (l >= r) {
    return
  }
  let m = Math.floor((l + r - 1) / 2)
  mergeSortRec(arr, l, m, animations)
  mergeSortRec(arr, m + 1, r, animations)
  merge(arr, l, m, r, animations)
}

const merge = (arr, l, m, r, animations) => {
  let n1 = m - l + 1
  let n2 = r - m

  let L = []
  let R = []

  for (let i = 0; i < n1; i++) L.push(arr[l + i])
  for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j])

  let i = 0
  let j = 0
  let k = l

  while (i < n1 && j < n2) {
    animations.push([l + i, m + 1 + j, L[i], R[j], 0])
    if (L[i] <= R[j]) {
      animations.push([l + i, k, L[i], arr[k], 4])
      animations.push([l + i, m + 1 + j, L[i], R[j], 3])
      arr[k] = L[i]
      i++
    } else {
      animations.push([m + 1 + j, k, R[j], arr[k], 4])
      animations.push([l + i, m + 1 + j, L[i], R[j], 3])
      arr[k] = R[j]
      j++
    }
    k++
  }

  while (i < n1) {
    animations.push([l + i, m + 1 + j - 1, L[i], R[j - 1], 0])
    animations.push([l + i, k, L[i], arr[k], 4])
    animations.push([l + i, m + 1 + j - 1, L[i], R[j - 1], 3])
    arr[k] = L[i]
    i++
    k++
  }

  while (j < n2) {
    animations.push([l + i - 1, m + 1 + j, L[i - 1], R[j], 0])
    animations.push([m + 1 + j, k, R[j], arr[k], 4])
    animations.push([l + i - 1, m + 1 + j, L[i - 1], R[j], 3])
    arr[k] = R[j]
    j++
    k++
  }
}

export default mergeSort
