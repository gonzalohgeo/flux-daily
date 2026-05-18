import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, StatusBar, AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { BG_COLORS, TEXT_COLORS, FONTS, ACCENT } from '../constants/colors';

export default function ConfigScreen({ navigation, route }) {
  const { userConfig, saveConfig, t } = useApp();
  const isEditing = route.params?.isEditing || false;

  const [selectedColor, setSelectedColor] = useState(userConfig?.color || BG_COLORS[1].hex);
  const [phrase, setPhrase] = useState(userConfig?.phrase || '');
  const [selectedFont, setSelectedFont] = useState(userConfig?.font || FONTS[0].family);
  const [selectedTextColor, setSelectedTextColor] = useState(userConfig?.textColor || TEXT_COLORS[1].hex);

  const persistDraftIfValid = useCallback(async () => {
    const trimmedPhrase = phrase.trim();
    if (!trimmedPhrase) return;

    const nextConfig = {
      color: selectedColor,
      phrase: trimmedPhrase,
      font: selectedFont,
      textColor: selectedTextColor,
    };

    const hasChanges =
      userConfig?.color !== nextConfig.color ||
      userConfig?.phrase !== nextConfig.phrase ||
      userConfig?.font !== nextConfig.font ||
      userConfig?.textColor !== nextConfig.textColor;

    if (hasChanges) {
      await saveConfig(nextConfig);
    }
  }, [phrase, saveConfig, selectedColor, selectedFont, selectedTextColor, userConfig]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        persistDraftIfValid();
      }
    });

    return () => {
      subscription.remove();
      persistDraftIfValid();
    };
  }, [persistDraftIfValid]);

  const handleSave = async () => {
    if (!phrase.trim()) return;
    await saveConfig({
      color: selectedColor,
      phrase: phrase.trim(),
      font: selectedFont,
      textColor: selectedTextColor,
    });
    if (isEditing) {
      navigation.goBack();
    } else {
      navigation.replace('Result');
    }
  };

  const isLight = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Preview */}
        <View style={[styles.preview, { backgroundColor: selectedColor }]}>
          <Text style={[styles.previewText, { fontFamily: selectedFont, color: selectedTextColor }]}>
            {phrase.trim() || t.phrasePlaceholder}
          </Text>
        </View>

        {/* Background color */}
        <Text style={styles.label}>{t.chooseColor}</Text>
        <View style={styles.row}>
          {BG_COLORS.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.colorCircle,
                { backgroundColor: c.hex },
                selectedColor === c.hex && styles.circleSelected,
              ]}
              onPress={() => setSelectedColor(c.hex)}
              activeOpacity={0.8}
            />
          ))}
        </View>

        {/* Phrase */}
        <Text style={styles.label}>{t.yourPhrase}</Text>
        <TextInput
          style={styles.input}
          value={phrase}
          onChangeText={setPhrase}
          placeholder={t.phrasePlaceholder}
          placeholderTextColor="#BDBDBD"
          maxLength={140}
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{phrase.length}/140</Text>

        {/* Font */}
        <Text style={styles.label}>{t.chooseFont}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fontScroll}>
          {FONTS.map(f => {
            const selected = selectedFont === f.family;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.fontBtn, selected && styles.fontBtnSelected]}
                onPress={() => setSelectedFont(f.family)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.fontBtnText,
                  { fontFamily: f.family },
                  selected && styles.fontBtnTextSelected,
                ]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Text color */}
        <Text style={styles.label}>{t.textColor}</Text>
        <View style={styles.row}>
          {TEXT_COLORS.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.colorCircle,
                { backgroundColor: c.hex },
                { borderColor: isLight(c.hex) ? '#CCC' : 'transparent', borderWidth: 1 },
                selectedTextColor === c.hex && styles.circleSelected,
              ]}
              onPress={() => setSelectedTextColor(c.hex)}
              activeOpacity={0.8}
            />
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity
          style={[styles.saveBtn, !phrase.trim() && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={!phrase.trim()}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>{t.save}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { padding: 24, paddingBottom: 48 },

  preview: {
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  previewText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 30,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 20,
    fontFamily: 'Inter_700Bold',
  },

  row: {
    flexDirection: 'row',
  },
  colorCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  circleSelected: {
    borderWidth: 3,
    borderColor: '#1A1A1A',
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    borderRadius: 14,
    padding: 16,
    fontSize: 17,
    color: '#1A1A1A',
    minHeight: 90,
    backgroundColor: '#FFF',
    fontFamily: 'Inter_400Regular',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 6,
    fontFamily: 'Inter_400Regular',
  },

  fontScroll: { flexGrow: 0 },
  fontBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  fontBtnSelected: {
    borderColor: '#1A1A1A',
    backgroundColor: '#1A1A1A',
  },
  fontBtnText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  fontBtnTextSelected: {
    color: '#FFF',
  },

  saveBtn: {
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 36,
  },
  saveBtnDisabled: {
    backgroundColor: '#D0D0D0',
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.3,
  },
});
