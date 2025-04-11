import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Screen03 = () => {
  const navigation = useNavigation();

  const handlePressImage87 = () => {
    navigation.navigate('Screen04');
  };

  const handlePressA34 = () => {
    navigation.navigate('Screen02');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={handlePressA34}>
          <Image source={require('../assets/image/ArtistProfile/a34.png')} style={styles.topImage} />
        </TouchableOpacity>
        <Image source={require('../assets/image/ArtistProfile/a35.png')} style={styles.topImage} />
      </View>
      <Image source={require('../assets/image/ArtistProfile/a31.png')} style={styles.fullWidthImage} />
      <Image source={require('../assets/image/ArtistProfile/a32.png')} style={styles.fullWidthImage} />
      <View style={styles.imageContainer}>
        <View style={styles.imageRow}>
          <TouchableOpacity onPress={handlePressImage87}>
            <Image source={require('../assets/image/AudioListing-SearchResults/Image87.png')} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>FLOWER</Text>
            <Text style={styles.infoText}>Jessica Gonzalez</Text>
            <Text style={styles.infoText}>2,1M     •3:36</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <Image source={require('../assets/image/AudioListing-SearchResults/Image84.png')} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>SHAPE OF YOU</Text>
            <Text style={styles.infoText}>Anthony Taylor</Text>
            <Text style={styles.infoText}>68M     •3:35</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <Image source={require('../assets/image/AudioListing-SearchResults/Image86.png')} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>BLINDING LIGHTS</Text>
            <Text style={styles.infoText}>Brian Bailey</Text>
            <Text style={styles.infoText}>93M     •4:39</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <Image source={require('../assets/image/AudioListing-SearchResults/Image87.png')} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>FLOWER</Text>
            <Text style={styles.infoText}>Jessica Gonzalez</Text>
            <Text style={styles.infoText}>2,1M     •3:36</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <Image source={require('../assets/image/ArtistProfile/Image69.png')} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>levitating</Text>
            <Text style={styles.infoText}>Anthony Taylor</Text>
            <Text style={styles.infoText}>9M     •7:48</Text>
          </View>
        </View>
        <View style={styles.imageRow}>
          <Image source={require('../assets/image/ArtistProfile/Image70.png')} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Astronaut in the Ocean</Text>
            <Text style={styles.infoText}>Pedro Moreno</Text>
            <Text style={styles.infoText}>23M     •3:36</Text>
          </View>
        </View>
      </View>
      <Image source={require('../assets/image/ArtistProfile/a33.png')} style={styles.fullWidthImage} />
      <View style={styles.taskbar}>
        <Image source={require('../assets/image/ArtistProfile/TabBarMenu5.png')} style={styles.taskbarImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  topImage: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  fullWidthImage: {
    width: '100%',
    height: width * 0.2,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 10,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginLeft: 10,
  },
  infoText: {
    fontSize: 10,
    color: '#333',
  },
  taskbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskbarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Screen03;
