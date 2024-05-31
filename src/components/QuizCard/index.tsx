import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

import { styles } from './styles'
import { THEME } from '../../styles/theme'

import { LevelBars } from '../LevelBars'
import { QUIZZES } from '../../data/quizzes'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

type Props = TouchableOpacityProps & {
  index: number
  data: (typeof QUIZZES)[0]
}

export function QuizCard({ index, data, ...rest }: Props) {
  const Icon = data.svg

  return (
    <AnimatedTouchableOpacity
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
      {...rest}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </AnimatedTouchableOpacity>
  )
}
