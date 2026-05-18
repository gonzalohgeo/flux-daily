import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const LANGUAGES = [
  { code: 'es', label: 'Español',    flag: '🇲🇽' },
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
];

export default function LanguageScreen({ navigation }) {
  const { t, language, setLanguage } = useApp();

  const handleSelect = async (code) => {
    if (code !== language) {
      await setLanguage(code);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <Text style={styles.backText}>‹  {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t.languageTitle}</Text>
        <Text style={styles.subtitle}>{t.languageSubtitle}</Text>
      </View>

      <View style={styles.list}>
        {LANGUAGES.map(lang => {
          const selected = language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.item, selected && styles.itemSelected]}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.75}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.langLabel, selected && styles.langLabelSelected]}>
                {lang.label}
              </Text>
              {selected && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { marginBottom: 12 },
  backText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 13,
    color: '#AAAAAA',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },

  list: {
    padding: 20,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  itemSelected: {
    borderColor: '#4ECDC4',
    backgroundColor: '#F0FBFA',
  },
  flag: { fontSize: 26, marginRight: 14 },
  langLabel: {
    flex: 1,
    fontSize: 17,
    color: '#1A1A1A',
    fontFamily: 'Inter_400Regular',
  },
  langLabelSelected: {
    fontFamily: 'Inter_700Bold',
    color: '#4ECDC4',
  },
  check: {
    fontSize: 18,
    color: '#4ECDC4',
    fontFamily: 'Inter_700Bold',
  },
});
