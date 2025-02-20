"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Carousel from "react-spring-3d-carousel"
import { config } from "react-spring"

interface CardProps {
  key: string
  content: React.ReactNode
}

interface CarouselComponentProps {
  cards: CardProps[]
  offset: number
  showArrows: boolean
}

const CarouselComponent: React.FC<CarouselComponentProps> = (props) => {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) }
  })

  const [offsetRadius, setOffsetRadius] = useState<number>(2)
  const [showArrows, setShowArrows] = useState<boolean>(false)
  const [goToSlide, setGoToSlide] = useState<number | null>(null)   // if i simply give number, it results buggy UI
  const [cards] = useState(table)

  useEffect(() => {
    setOffsetRadius(props.offset)
    setShowArrows(props.showArrows)
  }, [props.offset, props.showArrows])

  return (
    <div className="w-[320px] h-[500px] md:w-[340px] lg:w-[550px] lg:my-8">
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  )
}

export default CarouselComponent

