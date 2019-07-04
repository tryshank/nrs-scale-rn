import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { DangerZone } from "expo";
import { interpolateColors } from "react-native-redash";
import Cursor from "./Cursor";

const { Animated } = DangerZone;
const { Value, max, add, cond, lessOrEq, divide, round, lessThan } = Animated;

const { width: totalWidth } = Dimensions.get("window");
const count = 11;
const width = totalWidth - totalWidth * 0.15;
const height = width / count;
const realHeight = height + 22;

const rgbGreen = { r: 107, g: 193, b: 115 };
const rgbOrange = { r: 228, g: 175, b: 66 };
const rgbRed = { r: 220, g: 80, b: 80 };

const bgGreyColor = "#f1f2f6";

class Slider extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      x: new Value(0),
      isDefault: false,
    };
  }

  makeNotDefault = (defaultValue) => {
    this.setState({ isDefault: defaultValue })
  }

  render() {
    const { x, isDefault } = this.state;
    const { makeNotDefault } = this;
    const newWidth = add(max(x, 11), realHeight);
    const index = add(round(divide(x, height)), 0);

    return (
      <View style={styles.container}>
        {
          (new Array(count)).fill(0).map((e, i) => {
            const bgColor = isDefault && index !== null && cond(lessThan(index, 4), interpolateColors(
              cond(lessOrEq(index, 3), 0, 1),
              [0, 1],
              [rgbGreen, rgbOrange],
            ), interpolateColors(
              cond(lessOrEq(index, 6), 0, 1),
              [0, 1],
              [rgbOrange, rgbRed],
            ));
            return (
              <View key={i}>
                <Animated.View
                  style={[{
                    backgroundColor: bgColor,
                    width: newWidth,
                  }, styles.animatedProgress]}
                />
              </View>
            )
          })
        }
        <Cursor size={height} {...{ x, count, makeNotDefault, isDefault }} />
      </View>
    );
  }
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: width + 22,
    maxWidth: '100%',
    height: realHeight,
    borderRadius: (realHeight) / 2,
    backgroundColor: bgGreyColor,
    marginLeft: "2%",
    marginRight: "2%"
  },
  animatedProgress: {
    position: "absolute",
    top: 0,
    left: '-2%',
    height: realHeight,
    borderRadius: realHeight / 2,
  }
});
