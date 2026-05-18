import React from 'react';
import ContentScreen from './ContentScreen';
import { useApp } from '../context/AppContext';

export default function TermsScreen({ navigation }) {
  const { t } = useApp();
  return <ContentScreen navigation={navigation} title={t.termsTitle} content={t.termsContent} />;
}
