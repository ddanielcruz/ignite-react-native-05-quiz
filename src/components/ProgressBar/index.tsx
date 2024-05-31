import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './styles'

interface Props {
  total: number
  current: number
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100)
  const progress = useSharedValue(percentage)

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    }
  })

  useEffect(() => {
    progress.value = withTiming(percentage)
  }, [percentage])

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, progressAnimatedStyle]} />
    </View>
  )
}
