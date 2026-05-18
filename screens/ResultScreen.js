import React, { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function ResultScreen({ navigation }) {
  const { userConfig, t } = useApp();

  useEffect(() => {
    if (!userConfig) {
      navigation.replace('Config');
    }
  }, [navigation, userConfig]);

  if (!userConfig) {
    return null;
  }

  const isLightColor = (hex) => {
    if (!hex) return true;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };

  const statusBarStyle = isLightColor(userConfig.textColor) ? 'light-content' : 'dark-content';

  const handleShare = async () => {
    try {
      await Share.share({ message: `"${userConfig.phrase}"` });
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: userConfig.color }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={userConfig.color} />
      <SafeAreaView style={styles.safeArea}>

        {/* Menu button */}
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate('Menu')}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <Text style={[styles.menuIcon, { color: userConfig.textColor }]}>☰</Text>
        </TouchableOpacity>

        {/* Main phrase */}
        <View style={styles.content}>
          <Text style={[
            styles.phrase,
            { fontFamily: userConfig.font, color: userConfig.textColor },
          ]}>
            {userConfig.phrase}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: userConfig.textColor }]}
            onPress={() => navigation.navigate('Config', { isEditing: true })}
            activeOpacity={0.75}
          >
            <Text style={[styles.actionText, { color: userConfig.textColor }]}>
              {t.edit}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: userConfig.textColor }]}
            onPress={handleShare}
            activeOpacity={0.75}
          >
            <Text style={[styles.actionText, { color: userConfig.textColor }]}>
              {t.share}
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  menuBtn: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  menuIcon: { fontSize: 26 },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  phrase: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 42,
  },

  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 36,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});
