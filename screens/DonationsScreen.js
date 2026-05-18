import React from 'react';
import ContentScreen from './ContentScreen';
import { useApp } from '../context/AppContext';

export default function DonationsScreen({ navigation }) {
  const { t } = useApp();
  return <ContentScreen navigation={navigation} title={t.donationsTitle} content={t.donationsContent} />;
}
