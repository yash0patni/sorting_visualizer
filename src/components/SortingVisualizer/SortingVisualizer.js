import React, { Component } from "react"
import { Nav, Navbar } from "react-bootstrap"
import classes from "./SortingVisualizer.module.css"
import bubbleSort from "../../Algorithms/BubbleSort"
import mergeSort from "../../Algorithms/MergeSort"
import insertionSort from "../../Algorithms/InsertionSort"

const DELAY = 50

class SortingVisualizer extends Component {
  state = {
    arr: [],
    isSorting: false,
    isSorted: false,
  }

  componentDidMount() {
    this.generateArray()
  }

  generateArray = () => {
    //console.log("in generate array")
    if (this.state.isSorting) {
      return
    }
    if (this.state.isSorted) {
      //console.log("resetArray")
      this.resetArrayColor()
    }
    this.setState({ isSorted: false })
    let newArr = []
    const min = 5
    const max = 500
    for (let i = 0; i < 50; i++) {
      newArr.push(this.randomNumber(min, max))
    }
    this.setState({ arr: newArr })
  }

  resetArrayColor = () => {
    //console.log("resetArrayColor")
    const arrayBars = document.getElementsByClassName(classes.Bar)
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style
      arrayBarStyle.backgroundColor = "salmon"
    }
  }

  randomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  //Get Bubble Sort Animation
  getBubbleSortAnimation = () => {
    let tempArr = this.state.arr
    const animations = bubbleSort(tempArr)
    this.animateAlgorithm(animations)
  }

  //Get Merge Sort Animation
  getMergeSortAnimation = () => {
    let tempArr = this.state.arr
    const animations = mergeSort(tempArr)
    //console.log(animations)
    this.animateAlgorithm(animations)
  }

  //Get Insertion Sort Animation
  getInsertionSortAnimation = () => {
    let tempArr = this.state.arr
    const animations = insertionSort(tempArr)
    this.animateAlgorithm(animations)
  }

  //Animate Algoritms
  animateAlgorithm = (animations) => {
    if (this.state.isSorting) return
    this.setState({ isSorting: true })

    const arrayBars = document.getElementsByClassName(classes.Bar)
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const [
          barOneIndex,
          barTwoIndex,
          barOneValue,
          barTwoValue,
          swap,
        ] = animations[i]
        const barOneStyle = arrayBars[barOneIndex].style
        const barTwoStyle = arrayBars[barTwoIndex].style
        if (swap === 0) {
          barOneStyle.backgroundColor = "green"
          barTwoStyle.backgroundColor = "green"
        } else if (swap === 1) {
          const h1 = barOneValue
          const h2 = barTwoValue
          /*barOneStyle.height = `${h2}px`
          barTwoStyle.height = `${h1}px`*/
          let swappedArr = [...this.state.arr]
          swappedArr[barOneIndex] = h2
          swappedArr[barTwoIndex] = h1
          this.setState({ arr: swappedArr })
        } else if (swap === 4) {
          const h1 = barOneValue
          //const h2 = barTwoValue
          let swappedArr = [...this.state.arr]
          //swappedArr[barOneIndex] = h2
          swappedArr[barTwoIndex] = h1
          this.setState({ arr: swappedArr })
        } else if (swap === 2) {
          barOneStyle.backgroundColor = "red"
          barTwoStyle.backgroundColor = "red"
        } else if (swap === 3) {
          barOneStyle.backgroundColor = "salmon"
          barTwoStyle.backgroundColor = "salmon"
        }
      }, i * DELAY)
    }
    setTimeout(() => {
      this.animateSortedArray()
    }, animations.length * DELAY)
  }

  //Animate Sorted Array
  animateSortedArray = () => {
    const arrayBars = document.getElementsByClassName(classes.Bar)
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style
      setTimeout(() => {
        arrayBarStyle.backgroundColor = "#16a596"
      }, i * DELAY)
    }
    setTimeout(() => {
      this.setState({ isSorted: true })
      this.setState({ isSorting: false })
    }, arrayBars.length * DELAY)
  }

  render() {
    //console.log("Render Called")
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand href="#">Sorting Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="#"
                disabled={this.state.isSorting}
                onClick={this.generateArray}
                eventKey={this.state.isSorting ? "disabled" : ""}
              >
                Reset
              </Nav.Link>
              <Nav.Link
                href="#"
                disabled={this.state.isSorting}
                onClick={this.getBubbleSortAnimation}
                eventKey={this.state.isSorting ? "disabled" : ""}
              >
                Bubble Sort
              </Nav.Link>
              <Nav.Link
                href="#"
                disabled={this.state.isSorting}
                onClick={this.getInsertionSortAnimation}
                eventKey={this.state.isSorting ? "disabled" : ""}
              >
                Insertion Sort
              </Nav.Link>
              <Nav.Link
                href="#"
                disabled={this.state.isSorting}
                onClick={this.getMergeSortAnimation}
                eventKey={this.state.isSorting ? "disabled" : ""}
              >
                Merge Sort
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className={classes.Container}>
          {this.state.arr.map((num, index) => {
            return (
              <div
                className={classes.Bar}
                style={{ height: `${num}px`, backgroundColor: "salmon" }}
                key={index}
              ></div>
            )
          })}
        </div>
      </>
    )
  }
}

export default SortingVisualizer
