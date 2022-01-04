import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

function Sunrise({miniContainerStyle, arcStyle, sunViewStyle, sunStyle, greenViewStyle, greenFillViewStyle, greenFillStyle, borderBottomStyle, animationDuration, heightFill, imageSource}) {
  const [tempDeg, setTempDeg] = useState('0deg');
  const [tempHeight, setTempHeight] = useState(0);

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let angleTilt = 180;

    ballAnimatedValue.addListener((val) => {
      setTempDeg((angleTilt * val.value) + 'deg');
      let r = ((angleTilt * val.value) * Math.PI)/180;
      let hei = heightFill != undefined ? heightFill : 117;
      setTempHeight(hei - (hei * Math.cos(r)));
    });

    startAnimation();
  }, []);

  const startAnimation = () => {
    let dur = animationDuration != undefined ? animationDuration : 10000;
    Animated.timing(ballAnimatedValue, {
      toValue: 1,
      duration: dur,
      useNativeDriver: true,
      easing: Easing.linear
    }).start();
  }

  return (
      <View style = {[miniContainerStyle != undefined ? miniContainerStyle : styles.miniContainer]}>
        <View style = {[arcStyle != undefined ? arcStyle : styles.arc]} />
          <Animated.View style = {[sunViewStyle != undefined ? sunViewStyle : styles.sunView, {transform: [{rotate: tempDeg}]}]}>
            <Image style = {[sunStyle != undefined ? sunStyle : styles.sun]} source = {imageSource != undefined ? imageSource : require('./sun.png')} />
          </Animated.View>
          <View style = {[greenViewStyle != undefined ? greenViewStyle : styles.greenView]}>
            <View style = {[greenFillViewStyle != undefined ? greenFillViewStyle : styles.greenFillView]}>
              <Animated.View style = {[greenFillStyle != undefined ? greenFillStyle : styles.greenFill, {height: tempHeight}]} />
            </View>
          </View>
          <View style = {[borderBottomStyle != undefined ? borderBottomStyle : styles.borderBottom]} />
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