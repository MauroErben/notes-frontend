import React from 'react'
import { Waveform } from '@uiball/loaders'

function Spinner ({ size, color }) {
  return (
    <Waveform
      size={size}
      lineWeight={3.5}
      speed={1}
      color={color}
    />
  )
}
export default Spinner
