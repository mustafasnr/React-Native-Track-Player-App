import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
export const getPermissions = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      // console.log('Storage permission granted');
      return true;
    } else {
      console.log('Storage permission denied');
      return false;
    }
  } catch (error) {
    console.error('Failed to request storage permission:', error);
    return false;
  }
};

export function formatDate(duration) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}