import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {getPermissions} from '../utils/functions';
import {TrackItem, setupTrackPlayer} from '../components/TrackItem';
import TrackPlayer from 'react-native-track-player';
import Player from '../components/Player';

setupTrackPlayer();

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        if (await getPermissions()) {
          const directories = [
            `${RNFS.ExternalStorageDirectoryPath}/Sounds`,
            `${RNFS.ExternalStorageDirectoryPath}/DCIM/Camera`,
            `${RNFS.ExternalStorageDirectoryPath}/Music`,
            `${RNFS.ExternalStorageDirectoryPath}/Download`,
            `${RNFS.ExternalStorageDirectoryPath}/Bluetooth`,
          ];

          let audioFiles = [];
          let idCounter = 0;

          for (const dir of directories) {
            if (await RNFS.exists(dir)) {
              const files = await RNFS.readDir(dir);
              const filteredFiles = files
                .filter(
                  file =>
                    file.isFile() &&
                    (file.name.endsWith('.mp3') ||
                      file.name.endsWith('.mp4') ||
                      file.name.endsWith('.wav')),
                )
                .map(file => ({
                  id: idCounter++,
                  title: file.name,
                  url: `${file.path}`,
                }));

              audioFiles = [...audioFiles, ...filteredFiles];
            }
          }

          setTracks(audioFiles);
        }
      } catch (error) {
        console.error('Error reading files:', error);
      }
    };
    fetchAudioFiles();
  }, []);

  const playTrack = async track => {
    console.log('Çalınan şarkı,', track);
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
    setIsPlaying(true);
    setPlayingTrack(track);
  };

  const togglePlay = async () => {
    if (await TrackPlayer.getActiveTrack()) {
      isPlaying ? await TrackPlayer.pause() : await TrackPlayer.play();
      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    return async () => {
      await TrackPlayer.reset();
    };
  }, []);
  return (
    <View
      style={{
        marginTop: 10,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{width: '100%', flex: 1, overflow: 'hidden'}}>
        <FlatList
          data={tracks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TrackItem
              id={item.id}
              title={item.title}
              onPress={() => playTrack(item)}
            />
          )}
        />
      </View>

      <Player
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        playingTrack={playingTrack}></Player>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  trackItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  playButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
export default App;
