import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

import {DEFAULT_COUNTRY, DEFAULTS} from '../constants/defaults';
import {ERROR, SUCCESS} from '../constants/status';
import {t} from 'i18next';
import i18n from '../localization/getLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/actions/actions';
import {validations} from '../constants/validations';
import {toast} from '@backpackapp-io/react-native-toast';
import {ENDPOINTS} from '../constants/endpoints';
import {axiosService} from '../services/axiosService';
import {ROUTES} from '../navigation/routes';
import FormTextField from '../components/FormTextField';
import {encryptString} from '../utils/encryption';
import {getUsernameRules} from '../utils/helper';
import {theme} from '../theme';
import {SUPPORTED_LANGUAGES} from '../constants/supported';

const Login = ({navigation}: any) => {
  const [countryCode, setCountryCode] = useState<CountryCode>(
    DEFAULT_COUNTRY.cca2,
  );
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const {control, handleSubmit, watch} = useForm({
    mode: 'onSubmit',
    defaultValues: DEFAULTS.LOGIN,
  });
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  const dispatch = useDispatch();

  const getDefaultLanguage = async () => {
    const STORE_LANGUAGE_KEY = 'language.current';
    return await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
  };

  useEffect(() => {
    getDefaultLanguage().then((langCode: any) => {
      setSelectedLanguage({
        code: langCode,
        value: SUPPORTED_LANGUAGES[langCode],
      });
    });
  }, []);

  const {
    execute: executeAuth,
    response: executeAuthResponse,
    loading: executeAuthLoading,
  } = axiosService({
    url: ENDPOINTS.POST_LOGIN,
    method: 'POST',
  });

  useEffect(() => {
    if (!executeAuthLoading && executeAuthResponse) {
      const {data, status, errorCode}: any = executeAuthResponse;
      if (status === SUCCESS) {
        toast.success(t('message.SUCCESS_LOGGEDIN'));
        dispatch(setUser(data));
        navigation.navigate(ROUTES.PROFILE);
      }
      if (status === ERROR) {
        toast.error(t(`message.${errorCode ? errorCode : 'GENERIC_ERROR'}`));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeAuthLoading, executeAuthResponse]);

  const handleLogin = async (data: any) => {
    let request = {
      username: data.username,
      password: data.password,
    };
    let config = {
      Authorization: `Bearer ${encryptString(JSON.stringify(request))}`,
    };

    executeAuth({}, config);
  };

  const changeLanguage = (item: any) => {
    setSelectedLanguage(item);
    i18n.changeLanguage(item.code);
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);

    switch (country.cca2) {
      case 'IN':
        changeLanguage({
          code: 'hi',
          value: SUPPORTED_LANGUAGES['hi'],
        });
        break;
      case 'ES':
        changeLanguage({
          code: 'es',
          value: SUPPORTED_LANGUAGES['es'],
        });
        break;
      case 'AE':
      default:
        changeLanguage({
          code: 'en',
          value: SUPPORTED_LANGUAGES['en'],
        });

        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={{textAlign: 'center', paddingBottom: 50, fontSize: 24}}>
          MASHREQ CHALLENGE
        </Text>
        <View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: theme.roundness,
              padding: 5,
              borderColor: theme.colors.outline,
            }}>
            <CountryPicker
              {...{
                countryCode,
                withCountryNameButton: true,
                withFilter: true,
                withAlphaFilter: false,
                onSelect,
                preferredCountries: ['AE', 'ES', 'IN'],
              }}
            />
          </View>
          <FormTextField
            name={'username'}
            label={t('screens.login.username')}
            control={control}
            style={styles.input}
            required
            rules={
              watch('username').includes('@')
                ? validations.emailAddress
                : getUsernameRules(country?.cca2)
            }
          />
          <FormTextField
            name={'password'}
            label={t('screens.login.password')}
            control={control}
            style={styles.input}
            required
            password
          />
          <Button
            mode="contained"
            loading={executeAuthLoading}
            onPress={handleSubmit(handleLogin)}
            style={styles.button}>
            {t('screens.login.signIn')}
          </Button>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Registration', {
                c: country,
                cc: countryCode,
              })
            }>
            <View style={styles.createNewView}>
              <Text style={styles.createNewText}>
                {t('screens.login.signUp')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  formContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  createNewView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  createNewText: {
    fontWeight: 'bold',
  },
});

export default Login;
