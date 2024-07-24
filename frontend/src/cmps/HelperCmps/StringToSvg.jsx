import React from 'react'

export function StringToSvg({ svgString }) {
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />
}
