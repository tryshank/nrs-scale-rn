import * as React from "react";
import { StyleSheet } from "react-native";
import { DangerZone } from "expo";
import { Interactable, ReText } from "react-native-redash";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Labels from "./Labels";

const { Animated } = DangerZone;

const {
  Value, round, divide, concat, add, lessOrEq, cond, greaterOrEq
} = Animated;

interface CursorProps {
  x: typeof Value;
  size: number;
  count: number;
}

export default class Cursor extends React.PureComponent<CursorProps> {

  constructor(props: CursorProps) {
    super(props);

    this.state = {
      newX: new Value(0),
    };
  }

  _onCursorMove = (index: number) => {
    const { makeNotDefault, isDefault } = this.props;
    if (isDefault) {
      this.refs.cursor.snapTo({ index });
    } else {
      makeNotDefault(!isDefault);
    }
  }

  _onSnap = (index: number) => {
    console.log(index)
  }

  render() {
    const { size, count, x, isDefault } = this.props;
    const snapPoints = new Array(count).fill(0).map((e, i) => ({ x: i * (size) }));
    const indexValue = round(divide(x, size));
    const valueLimit = cond(lessOrEq(indexValue, 10), cond(greaterOrEq(indexValue, 0), indexValue, 0), 10);
    const cursorText = concat(add(valueLimit, 0));
    const realSize = size + 27;

    return (
      <>
        <Labels size={size} {...{ x, count, onCursorMove: this._onCursorMove }} />
        {isDefault ?
          <Interactable ref="cursor"
            onSnap={({ nativeEvent: { index } }) => this._onSnap(index)}
            horizontalOnly
            {...{ snapPoints, animatedValueX: x }}>
            <Animated.View
              style={[{
                width: realSize,
                height: realSize,
                borderRadius: (realSize) / 2,
              }, styles.animatedCursor]}
            >
              <ReText style={{ fontSize: hp('2.2%'), color: '#1C3A54' }} text={cursorText} />
            </Animated.View>
          </Interactable>
          : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  cursor: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  animatedCursor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    position: "absolute",
    top: -2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: '#F0F2F5',
    borderWidth: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
});
