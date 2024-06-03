import { useEffect } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  BlurMask,
  Canvas,
  Circle,
  Easing,
  Path,
  Skia,
  runTiming,
  useValue,
} from '@shopify/react-native-skia'

import { styles } from './styles'
import { THEME } from '../../styles/theme'

const CHECK_SIZE = 28
const CHECK_STROKE = 2

const RING_RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2
const INDICATOR_RADIUS = RING_RADIUS / 2

type OptionProps = TouchableOpacityProps & {
  checked: boolean
  title: string
}

export function Option({ checked, title, ...rest }: OptionProps) {
  const path = Skia.Path.Make().addCircle(CHECK_SIZE, CHECK_SIZE, RING_RADIUS)
  const ringPercentage = useValue(0)
  const indicatorRadius = useValue(0)

  useEffect(() => {
    runTiming(ringPercentage, checked ? 1 : 0, { duration: 350 })
    runTiming(indicatorRadius, checked ? INDICATOR_RADIUS : 0, {
      duration: 350,
    })
  }, [checked])

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={ringPercentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={indicatorRadius}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  )
}
