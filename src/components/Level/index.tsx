import { useEffect } from 'react'
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { THEME } from '../../styles/theme'
import { styles } from './styles'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string
  isChecked?: boolean
  type?: keyof typeof TYPE_COLORS
}

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...props
}: Props) {
  const color = TYPE_COLORS[type]

  const scale = useSharedValue(1)
  const checked = useSharedValue(1)

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', color],
      ),
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [color, THEME.COLORS.WHITE],
      ),
    }
  })

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked])

  function handlePressIn(e: GestureResponderEvent) {
    scale.value = withTiming(1.1)
    props.onPressIn?.(e)
  }

  function handlePressOut(e: GestureResponderEvent) {
    scale.value = withTiming(1)
    props.onPressOut?.(e)
  }

  return (
    <AnimatedPressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        { borderColor: color },
        animatedContainerStyle,
        props.style,
      ]}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </AnimatedPressable>
  )
}
