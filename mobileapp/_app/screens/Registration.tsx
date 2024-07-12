import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../theme';
import {useForm} from 'react-hook-form';
import {DEFAULT_COUNTRY, DEFAULTS} from '../constants/defaults';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {t} from 'i18next';
import {getUsernameRules} from '../utils/helper';
import {toast} from '@backpackapp-io/react-native-toast';
import {ENDPOINTS} from '../constants/endpoints';
import {axiosService} from '../services/axiosService';
import {SUCCESS, ERROR} from '../constants/status';
import {ROUTES} from '../navigation/routes';
import FormTextField from '../components/FormTextField';
import {validations} from '../constants/validations';
import {SUPPORTED_LANGUAGES} from '../constants/supported';
import i18n from '../localization/getLanguage';

const Registration = ({navigation, route}: any) => {
  const {c, cc} = route.params;
  const [countryCode, setCountryCode] = useState<CountryCode>(cc);
  const [country, setCountry] = useState<Country>(c);
  const {control, handleSubmit} = useForm({
    defaultValues: DEFAULTS.REGISTRATION,
  });

  const {
    execute: executeRegister,
    response: executeRegisterResponse,
    loading: executeRegisterLoading,
  } = axiosService({
    url: ENDPOINTS.POST_REGISTRATION,
    method: 'POST',
  });

  useEffect(() => {
    if (!executeRegisterLoading && executeRegisterResponse) {
      const {data, status, errorCode} = executeRegisterResponse;
      if (status === SUCCESS) {
        toast.success(t('message.SUCCESS_REGISTERED'));
        navigation.push(ROUTES.LOGIN);
      }
      if (status === ERROR) {
        toast.error(t(`message.${errorCode ? errorCode : 'GENERIC_ERROR'}`));
      }
    }
  }, [executeRegisterLoading, executeRegisterResponse]);

  const handleRegistration = (data: any) => {
    executeRegister({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  const changeLanguage = (item: any) => {
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
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            paddingBottom: 30,
            paddingTop: 50,
            fontSize: 24,
          }}>
          Sign Up
        </Text>
        <View style={styles.formContainer}>
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
            name={'firstName'}
            label={t('screens.registration.firstName')}
            control={control}
            style={styles.input}
            required
          />
          <FormTextField
            name={'lastName'}
            label={t('screens.registration.lastName')}
            control={control}
            style={styles.input}
            required
          />
          <FormTextField
            name={'username'}
            label={t('screens.registration.username')}
            control={control}
            style={styles.input}
            required
            rules={getUsernameRules(country?.cca2)}
          />
          <FormTextField
            name={'email'}
            label={t('screens.registration.email')}
            control={control}
            style={styles.input}
            required
            rules={validations.emailAddress}
          />
          <FormTextField
            name={'password'}
            label={t('screens.registration.password')}
            control={control}
            style={styles.input}
            required
            password
          />
          <Button
            mode="contained"
            loading={executeRegisterLoading}
            onPress={handleSubmit(handleRegistration)}
            style={styles.button}>
            {t('screens.registration.signUp')}
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.backView}>
              <Text style={styles.backText}>
                {t('screens.registration.loginBack')}
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  backView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  backText: {
    fontWeight: 'bold',
  },
});

export default Registration;
