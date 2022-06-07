import React from 'react'
import { Waveform } from '@uiball/loaders'

function Spinner ({ size }) {
  return (
    <Waveform
      size={size}
      lineWeight={3.5}
      speed={1}
      color='#3182ce'
    />
  )
}
export default Spinner
