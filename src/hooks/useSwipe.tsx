import { TouchEvent, useState } from "react"

interface SwipeProps {
    onSwipedUp: () => void
    onSwipedDown: () => void
    onSwipedLeft: () => void
    onSwipedRight: () => void
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void
    onTouchMove: (e: TouchEvent) => void
    onTouchEnd: () => void
}

export default function useSwipe(props: SwipeProps): SwipeOutput {
    const [touchYStart, setTouchYStart] = useState(0)
    const [touchYEnd, setTouchYEnd] = useState(0)
    const [touchXStart, setTouchXStart] = useState(0)
    const [touchXEnd, setTouchXEnd] = useState(0)

    const minSwipeDistance = 50

    const onTouchStart = (e: TouchEvent) => {
        setTouchYEnd(0) // otherwise the swipe is fired even with usual touch events
        setTouchYStart(e.targetTouches[0].clientY)
        setTouchXEnd(0)
        setTouchXStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
        setTouchYEnd(e.targetTouches[0].clientY)
        setTouchXEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {

        if (touchYStart && touchYEnd && touchXStart && touchXEnd) {
            const distanceY = touchYStart - touchYEnd
            const isUpSwipe = distanceY > minSwipeDistance
            const isDownSwipe = distanceY < -minSwipeDistance

            const distanceX = touchXStart - touchXEnd
            const isLeftSwipe = distanceX > minSwipeDistance
            const isRightSwipe = distanceX < -minSwipeDistance

            if (Math.abs(distanceX) > Math.abs(distanceY)) { // Determine swipe direction
                if (isLeftSwipe) {
                    props.onSwipedLeft()
                }
                if (isRightSwipe) {
                    props.onSwipedRight()
                }
            } else {
                if (isUpSwipe) {
                    props.onSwipedUp()
                }
                if (isDownSwipe) {
                    props.onSwipedDown()
                }
            }
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}