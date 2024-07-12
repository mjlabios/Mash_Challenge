import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {t} from 'i18next';
import Share from 'react-native-share';

const Profile = ({navigation}: any) => {
  const currentUser = useSelector((state: any) => state.currentUser);
  let title =
    currentUser?.FIRST_NAME + ' has something exciting to share to you';
  const shareOptions = {
    title: title,
    message:
      'Offering a combination of convenience, flexibility & coupled with a host of benefits, it’s the perfect account for your day-to-day banking needs.',
    url: 'https://digital.mashreq.com/onlinebanking/steps/casa/en/homepage',
  };

  function sharing() {
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{t('screens.profile.name')}</Text>
        <View>
          <Text style={styles.username}>
            {currentUser?.LAST_NAME}, {currentUser?.FIRST_NAME}{' '}
          </Text>
        </View>
        <Text style={styles.label}>{t('screens.profile.username')}</Text>
        <View>
          <Text style={styles.username}>{currentUser?.USERNAME}</Text>
        </View>
        <Text style={styles.label}>{t('screens.profile.email')}</Text>
        <View>
          <Text style={styles.username}>{currentUser?.EMAIL}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            sharing();
          }}
          style={{marginTop: 50}}>
          Share
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{marginTop: 15}}>
          {t('screens.profile.logOut')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  username: {
    fontSize: 24,
    textAlign: 'center',
  },
});
export default Profile;
