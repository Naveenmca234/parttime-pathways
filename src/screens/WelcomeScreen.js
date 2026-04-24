import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { colors } from '../theme';
import { useApp } from '../context/AppContext';

export default function WelcomeScreen() {
  const { setScreen, t } = useApp();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  return (
    <LinearGradient colors={[colors.blue, colors.navy]} style={styles.container}>
      <View style={[styles.inner, { maxWidth }]}> 
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' }}
          style={styles.logo}
        />
        <Text style={styles.title}>{t('appName')}</Text>
        <Text style={styles.subtitle}>{t('tagline')}</Text>
        <View style={styles.buttonStack}>
          <Button title={t('selectLanguage')} variant="secondary" onPress={() => setScreen('language')} />
          <Button title={t('login')} variant="secondary" onPress={() => setScreen('login')} />
          <Button title={t('register')} variant="secondary" onPress={() => setScreen('register')} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  inner: { width: '100%', alignItems: 'center' },
  logo: { width: 190, height: 190, borderRadius: 95, marginBottom: 32, borderWidth: 5, borderColor: 'rgba(255,255,255,0.35)' },
  title: { fontSize: 40, color: colors.white, fontWeight: '900', textAlign: 'center' },
  subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.88)', textAlign: 'center', marginTop: 10 },
  buttonStack: { width: '100%', marginTop: 90, gap: 18 }
});
