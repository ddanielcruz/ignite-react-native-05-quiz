import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'

import { THEME } from '../../styles/theme'

const STATUS = [
  'transparent',
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
]

interface OverlayFeedbackProps {
  status?: number
}

export function OverlayFeedback({ status = 0 }: OverlayFeedbackProps) {
  const { height, width } = useWindowDimensions()
  const opacity = useSharedValue(0)

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 500 }),
    )
  }, [status])

  return (
    <Animated.View
      style={[{ height, width, position: 'absolute' }, containerAnimatedStyle]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={STATUS[status]}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
