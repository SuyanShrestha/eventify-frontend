import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  autoScrollInterval?: number 
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  cards: cardProps,
  offset,
  showArrows,
  autoScrollInterval = 3000, 
}) => {
  const table = cardProps.map((element, index) => ({
    ...element,
    onClick: () => handleSlideChange(index),
  }))

  const [offsetRadius, setOffsetRadius] = useState<number>(2)
  const [showArrowsState, setShowArrows] = useState<boolean>(false)
  const [goToSlide, setGoToSlide] = useState<number>(0)
  const [cards] = useState(table)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setOffsetRadius(offset)
    setShowArrows(showArrows)
  }, [offset, showArrows])

  const handleSlideChange = (index: number) => {
    setGoToSlide(index)
    resetAutoScroll() // reset timer when manually scrolling
  }

  const resetAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    autoScrollRef.current = setInterval(() => {
      setGoToSlide((prev) => (prev + 1) % cards.length)
    }, autoScrollInterval)
  }

  useEffect(() => {
    resetAutoScroll()
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [cards.length, autoScrollInterval])

  return (
    <div className="w-[220px] h-[500px] md:w-[340px] lg:w-[400px] lg:my-8">
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrowsState}
        animationConfig={config.gentle}
      />
    </div>
  )
}

export default CarouselComponent
