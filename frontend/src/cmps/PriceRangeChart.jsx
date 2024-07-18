import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  pianoKey: {
    width: 10,
    height: ({ height }) => height, // Dynamically setting the height
    backgroundColor: '#222',
    border: '1px solid #222',
    cursor: 'pointer',
    display: 'inline-block', // Ensuring the divs behave as inline elements
    marginRight: 2, // Adding margin between keys
  },
}))

export function PriceRangeChart() {
  const [columnHeights, setColumnHeights] = useState([30, 50, 10, 23]) // Initial heights for columns
  const classes = useStyles()

  const handleHeightChange = (index, height) => {
    const newHeights = [...columnHeights]
    newHeights[index] = height
    setColumnHeights(newHeights)
  }

  return (
    <div className={classes.root}>
      {columnHeights.map((height, index) => (
        <div
          key={index}
          className={classes.pianoKey}
          style={{ height: `${height}px` }}
          onClick={() => handleHeightChange(index, height + 10)} // Example: Increase height by 10px on click
        >
          {height}
        </div>
      ))}
    </div>
  )
}