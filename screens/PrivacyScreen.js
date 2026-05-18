import React from 'react';
import ContentScreen from './ContentScreen';
import { useApp } from '../context/AppContext';

export default function PrivacyScreen({ navigation }) {
  const { t } = useApp();
  return <ContentScreen navigation={navigation} title={t.privacyTitle} content={t.privacyContent} />;
}
