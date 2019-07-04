import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { DangerZone } from "expo";
import { interpolateColors } from "react-native-redash";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const { Animated } = DangerZone;
const {
  Value, cond, lessOrEq, add, round, divide
} = Animated;

const white = { r: 255, g: 255, b: 255 };
const gray = { r: 128, g: 128, b: 128 };

interface LabelProps {
  x: typeof Value;
  count: number;
  size: number;
  value: number;
  onCursorMove: (i: number) => void
}

export default ({ count, x, size, onCursorMove }: LabelProps) => {
  const index = add(round(divide(x, size)), 0);

  const onTapIndex = (i: number) => {
    onCursorMove(i)
  }

  return (
    <View style={styles.cursor}>
      {
        (new Array(count)).fill(0).map((e, i) => {
          const color = interpolateColors(
            cond(lessOrEq(index, i), 0, 1),
            [0, 1],
            [gray, white],
          );
          return (
            <View key={i} style={{ flex: 1 }}>
              <TapGestureHandler
                onHandlerStateChange={() => onTapIndex(i)}
              >
                <Animated.View style={{
                  flex: 1, textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ translateX: 0 }]
                }}>
                  <Animated.Text style={[{ color }, styles.animatedCursor]}>{`${i}`}</Animated.Text>
                </Animated.View>
              </TapGestureHandler>
            </View>

          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cursor: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1%",
    paddingRight: "1%"
  },
  animatedCursor: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: hp('2.2%'),
  },
});
