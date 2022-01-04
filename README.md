# react-native-sunrise-animation
A sunrise animation similar to Muslim Pro for react native projects.

## Installation

`$ npm install @learn-tocode/react-native-sunrise-animation --save`

## Usage

```js
import Sunrise from '@learn-tocode/react-native-sunrise-animation';

<Sunrise 
arcColor = {'#CCE9E0'} 
containerColor = {'#336B6E'} 
arcStyle = {'dashed'} 
barColor = {'#CCE9E0'} 
animationDuration = {10000} 
semiCircleColor = {'#35B5AB'} 
defaultImage = {true} 
/>
```

### Properties for components

| Prop                                 | Description                                                | Default `(All Required)` |
| ------------------------------------ | -----------------------------------------------------------| ------------------------ |
| **`arcColor`**                       | The color of the dotted arc.                               | `#CCE9E0`                |
| **`containerColor`**                 | The color of the background view.                          | `#336B6E`                |
| **`arcStyle`**                       | The style of arc.                                          | `dashed`                 |
| **`barColor`**                       | The color of the bottom bar.                               | `#CCE9E0`                |
| **`animationDuration`**              | The duration of the sun and semi circle fill animation.    | `10000`                  |
| **`semiCircleColor`**                | The color of the semi circle.                              | `#35B5AB`                |
| **`defaultImage`**                   | Whether the default image is required or not.              | `true`                   |
| **`imageSource`**                    | The image that is rotating on the arc. `(Not Required)`    | `require('./sun.png')`   |
