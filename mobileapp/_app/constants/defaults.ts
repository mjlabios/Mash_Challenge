import {Country} from 'react-native-country-picker-modal';

export const DEFAULTS = {
    LOGIN: {
      username: "",
      password: "",
    },
    REGISTRATION: {
      firstName: "",
      lastName:"",
      username: "",
      email: "",
      password: "",
    },
    PROFILE:{
      oldpass:"",
      newpass:""
    }
  };
  
  export const DEFAULT_COUNTRY: Country = {
    name: 'United Arab Emirates',
    callingCode: ['971'],
    cca2: 'AE',
    currency: ['AED'],
    flag: 'flag-ae', 
    region: 'Asia',
    subregion: 'Western Asia',
  };