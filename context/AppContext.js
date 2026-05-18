import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../constants/strings';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userConfig, setUserConfig] = useState(null);
  const [language, setLanguageState] = useState('es');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [configStr, lang] = await Promise.all([
        AsyncStorage.getItem('userConfig'),
        AsyncStorage.getItem('userLanguage'),
      ]);
      if (configStr) setUserConfig(JSON.parse(configStr));
      if (lang) setLanguageState(lang);
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };

  const saveConfig = async (config) => {
    try {
      await AsyncStorage.setItem('userConfig', JSON.stringify(config));
      setUserConfig(config);
    } catch (e) {
      console.error('Error saving config:', e);
    }
  };

  const setLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      setLanguageState(lang);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

  const t = strings[language] || strings.es;

  return (
    <AppContext.Provider value={{ userConfig, saveConfig, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
