import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Entypo';
import TextTicker from 'react-native-text-ticker';
export const TrackItem = ({id, title, onPress}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <TextTicker
          duration={15 * 1000}
          loop={true}
          bounce={true}
          bounceDelay={1000}
          marqueeDelay={1000}
          style={styles.titleText}>
          {title}
        </TextTicker>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Icon
          style={styles.icon}
          color={'red'}
          name={'beamed-note'}
          size={50}></Icon>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 5,
    width: '95%',
    height: 80,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    paddingStart: 15,
  },
  titleText: {
    fontSize: 25,
    color: 'black',
  },
  iconContainer: {
    marginHorizontal: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
  });
}
