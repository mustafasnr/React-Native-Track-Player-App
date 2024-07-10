import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import TextTicker from 'react-native-text-ticker';
import {formatDate} from '../utils/functions';

export const Player = params => {
  const {position, duration} = useProgress();
  const durationRef = useRef(0);
  useEffect(() => {
    console.log('Duration Değişti, Yeni Duration:', duration);
    durationRef.current = duration;
  }, [duration]);

  const seekTo = async value => {
    const second = (Number(value) * durationRef.current) / 100;
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles.playerContainer}>
      <View style={styles.sliderContainer}>
        <Text style={styles.time}>{formatDate(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={seekTo}
          minimumTrackTintColor="black"
          maximumTrackTintColor="#777"
          thumbTintColor="black"
        />
        <Text style={styles.time}>{formatDate(duration)}</Text>
      </View>

      <View style={styles.musicInfoBox}>
        <View style={styles.nameBox}>
          <TextTicker
            duration={20*1000}
            loop={true}
            bounce={true}
            bounceDelay={1000}
            marqueeDelay={1000}
            style={styles.name}>
            {params.playingTrack
              ? params.playingTrack.title
              : 'Lütfen Bir Müzik Seçin'}
          </TextTicker>
        </View>
        <Icon
          color={'white'}
          onPress={params.togglePlay}
          name={params.isPlaying ? 'circle-pause' : 'circle-play'}
          size={56}
          style={
            params.isPlaying ? styles.statePlay : styles.statePause
          }></Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statePlay: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'black',
    padding: 2,
    borderRadius: 30,
  },
  statePause: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'black',
    padding: 2,
    borderRadius: 30,
  },
  playerContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fdfdfd', // Örneğin daha açık bir arka plan rengi
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    overflow: 'visible', // İçerik sınırlarını aşmasını sağlar
  },
  musicInfoBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd', // Beyaz arka plan
    borderRadius: 10,
    padding: 9,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,

    elevation: 24,
  },
  nameBox: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Koyu renk metin
    justifyContent: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    color: 'black',
  },
  slider: {
    alignSelf: 'center',
    width: '70%',
    height: 20,
    marginHorizontal: 5,
  },
});
export default Player;
