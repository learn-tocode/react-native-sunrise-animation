import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

function Sunrise({containerColor, arcStyle, arcColor, semiCircleColor, barColor, animationDuration, defaultImage, imageSource}) {
  const [tempDeg, setTempDeg] = useState('0deg');
  const [tempHeight, setTempHeight] = useState(0);

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let angleTilt = 180;

    ballAnimatedValue.addListener((val) => {
      setTempDeg((angleTilt * val.value) + 'deg');
      let r = ((angleTilt * val.value) * Math.PI)/180;
      setTempHeight(117 - (117 * Math.cos(r)));
    });

    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(ballAnimatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
      easing: Easing.linear
    }).start();
  }

  return (
      <View style = {[styles.miniContainer, {backgroundColor: containerColor}]}>
        <View style = {[styles.arc, {borderStyle: arcStyle, color: arcColor}]} />
          <Animated.View style = {[styles.sunView, {transform: [{rotate: tempDeg}]}]}>
            <Image style = {[styles.sun]} source = {defaultImage ? require('./sun.png') : imageSource } />
          </Animated.View>
          <View style = {[styles.greenView]}>
            <View style = {[styles.greenFillView]}>
              <Animated.View style = {[styles.greenFill, {backgroundColor: semiCircleColor}, {height: 50}]} />
            </View>
          </View>
          <View style = {[styles.borderBottom, {borderColor: barColor}]} />
      </View>
  );
}

const styles = StyleSheet.create ({
  miniContainer: {
    justifyContent: 'flex-end',
    backgroundColor: '#336B6E',
    borderRadius: 25,
    height: 190,
    width: Dimensions.get('screen').width - 30,
    alignSelf: 'center'
  },
  arc: {
    width: 240,
    height: 120,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CCE9E0',
    alignSelf: 'center',
    bottom: 22,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    zIndex: 1
  },
  sunView: {
    borderWidth: 2,
    borderColor: 'transparent',
    zIndex: 1,
    width: 220,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20
  },
  sun: {
    marginLeft: -21,
    marginTop: -9.5,
    zIndex: 1,
    backgroundColor: 'transparent',
    height: 20,
    width: 20,
    borderRadius: 20,
    position: 'absolute'
  },
  greenView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -35,
    alignSelf: 'center'
  },
  greenFillView: {
    transform: [{rotate: '90deg'}],
    width: 117,
    height: 234,
    borderTopLeftRadius: 117,
    borderBottomLeftRadius: 117,
    overflow: 'hidden'
  },
  greenFill: {
    backgroundColor: '#35B5AB',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  borderBottom: {
    borderWidth: 2,
    borderColor: '#CCE9E0',
    width: Dimensions.get('screen').width - 60,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20
  }
})

module.exports = Sunrise;