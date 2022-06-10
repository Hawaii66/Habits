import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"

export const useShake = (running: boolean = true, rate: number = 300) => {
    const val = useRef(new Animated.Value(0))

    const anim = useRef(
        Animated.loop(
            Animated.timing(val.current, {
                toValue: 1,
                duration: rate,
                easing: Easing.linear,
                useNativeDriver: true,
                isInteraction: false,
            })
        )
    ).current

    const interpolatedScale = val.current.interpolate({
        inputRange: [0, 0.25, 0.50, 0.75, 1],
        outputRange: [1, 0.98, 1, 1.02, 1],
    })
    const interpolatedRotate = val.current.interpolate({
        inputRange: [0, 0.125, 0.25, 0.375, 0.50, 0.625, 0.75, 0.875, 1],
        outputRange: ["0deg", "-1deg", "0deg", "1deg", "0deg", "-1deg", "0deg", "1deg", "0deg"],
    })

    useEffect(() => {
        if (running) {
            anim.start()
        } else {
            anim.stop()
            val.current.setValue(0)
        }

        return () => anim.stop()
    }, [running, anim])

    return [interpolatedScale, interpolatedRotate] as const
}