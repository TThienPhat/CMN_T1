import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const Screen04 = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/PlayanAudio/Image58.png')} style={styles.mainImage} />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>V</Text>
        </TouchableOpacity>
        <View style={styles.lowerHalf}>
          <Text style={styles.title}>FLOWER</Text>
          <Text style={styles.author}>Jessica Gonzalez</Text>
          <Image source={require('../assets/image/PlayanAudio/Group4.png')} style={styles.overlayImage} />
          <View style={styles.imageRow}>
            <Image source={require('../assets/image/PlayanAudio/shup.webp')} style={styles.smallImage} />
            <Image source={require('../assets/image/PlayanAudio/lui.webp')} style={styles.smallImage} />
            <Image source={require('../assets/image/PlayanAudio/IconButton3.png')} style={styles.smallImage} />
            <Image source={require('../assets/image/PlayanAudio/toi.webp')} style={styles.smallImage} />
            <Image source={require('../assets/image/PlayanAudio/cham.png')} style={styles.smallImage} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playButton: {
    position: 'absolute',
    top: 10,
    left: 10, // Đổi vị trí sang trái
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  playText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    right: 10, // Đổi vị trí sang phải
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    // Xóa transform để chữ không bị ngược
  },
  lowerHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  overlayImage: {
    width: '100%',
    height: height * 0.2,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallImage: {
    width: width * 0.18,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  additionalImage: {
    width: '100%',
    height: height * 0.1,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Screen04;
