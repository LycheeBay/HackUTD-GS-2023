import React, { ReactNode } from 'react'

type ContainerTypes  = {
  children: ReactNode
}

const Container = ({children}: ContainerTypes) => {
  return (
  <div className="container mx-auto py-16">{children}</div>
  )
}

export default Container
