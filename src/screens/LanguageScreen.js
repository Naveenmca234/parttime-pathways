import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { colors } from '../theme';
import { languages } from '../i18n';
import { useApp } from '../context/AppContext';

export default function LanguageScreen() {
  const { lang, setLang, setScreen, t } = useApp();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  return (
    <LinearGradient colors={[colors.blue, colors.navy]} style={styles.container}>
      <View style={[styles.inner, { maxWidth }]}> 
        <Text style={styles.title}>{t('selectLanguage')}</Text>
        <Text style={styles.subtitle}>Choose your preferred language</Text>
        <View style={styles.list}>
          {languages.map((item) => (
            <Button
              key={item.code}
              title={item.label}
              variant={lang === item.code ? 'primary' : 'secondary'}
              onPress={() => {
                setLang(item.code);
                setScreen('login');
              }}
              style={styles.button}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 80 },
  inner: { width: '100%' },
  title: { fontSize: 38, color: colors.white, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.white, fontSize: 18, textAlign: 'center', marginTop: 10 },
  list: { marginTop: 60, gap: 22 },
  button: { minHeight: 70 }
});
