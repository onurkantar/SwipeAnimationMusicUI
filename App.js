import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  Slider,
} from "react-native";

//import { Slider } from "@react-native-community/slider";

import { Icon } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class App extends Component {
  constructor() {
    super();
    this.animation = new Animated.ValueXY({ x: 0, y: windowHeight - 120 });
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -windowHeight + 120,
            tension: 1,
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: windowHeight - 120,
            tension: 1,
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform(),
    };

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, windowHeight - 90],
      outputRange: [200, 32],
      extrapolate: "clamp",
    });

    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, windowHeight - 500, windowHeight - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, windowHeight - 90],
      outputRange: [windowWidth / 2 - 100, 10],
      extrapolate: "clamp",
    });

    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, windowHeight - 90],
      outputRange: [windowHeight / 2, 90],
      extrapolate: "clamp",
    });

    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, windowHeight - 500, windowHeight - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            animatedHeight,
            {
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 10,
              height: windowHeight,
            },
          ]}
        >
          <Animated.View
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: animatedSongTitleOpacity,
              borderTopColor: "gray",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.Image
                style={{
                  height: animatedImageHeight,
                  width: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft,
                }}
                source={require("./assets/img/Hotel_California_Tekli_Plak_kapak.jpg")}
              />
              <Animated.Text
                style={{
                  opacity: animatedSongTitleOpacity,
                  flex: 1.7,
                  fontSize: 18,
                  paddingLeft: 10,
                }}
              >
                Hotel California (Live)
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                opacity: animatedSongTitleOpacity,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Icon name="pause" type="font-awesome" />
              <Icon name="play" type="font-awesome" />
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={{
              height: animatedHeaderHeight,
              opacity: animatedSongDetailsOpacity,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Hotel California (Live)
              </Text>
              <Text style={{ fontSize: 18 }}> Eagles - Hell Freezes Over </Text>
            </View>

            <View
              style={{ height: 40, width: windowWidth, alignItems: "center" }}
            >
              <Slider
                style={{ width: 300 }}
                step={1}
                minimumValue={18}
                maximumValue={71}
                value={35}
              />
            </View>

            <View
              style={{
                flex: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Icon name="backward" type="font-awesome" size={25} />
              <Icon name="pause" type="font-awesome" size={32} />
              <Icon name="forward" type="font-awesome" size={25} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingBottom: 20,
              }}
            >
              <Icon name="add" type="ionicon" size={25} color={"green"} />
              <Icon
                name="ellipsis-vertical"
                type="ionicon"
                size={25}
                color={"green"}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
