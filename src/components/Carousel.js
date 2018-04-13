import React from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.3;

const styles = StyleSheet.create({
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});

export default class Carousel extends React.Component {
  render() {
    const { images } = this.props;
    if (images && images.length) {
      return (
        <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {images.map(image => (
              <Image style={styles.image} source={image.source} />
            ))}
          </ScrollView>
        </View>
      );
    }
    return null;
  }
}