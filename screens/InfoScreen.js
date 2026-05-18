import React from 'react';
import ContentScreen from './ContentScreen';
import { useApp } from '../context/AppContext';

export default function InfoScreen({ navigation }) {
  const { t } = useApp();
  return <ContentScreen navigation={navigation} title={t.infoTitle} content={t.infoContent} />;
}
