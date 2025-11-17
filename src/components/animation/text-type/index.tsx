import { TypeAnimation } from 'react-type-animation';
import React from 'react'

type Props = {
    textSequence : Array<string | number>
}

const TextTypeAnimation = ({textSequence}: Props) => {
  return (
    <div>
          <TypeAnimation
      sequence={[
      ...textSequence
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
      cursor={false}
    />
    </div>
  )
}

export default TextTypeAnimation