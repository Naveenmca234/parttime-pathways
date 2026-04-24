import React from 'react';
import { ScrollView, View, Text, StyleSheet, Switch } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { languages } from '../i18n';

export default function SettingsScreen() {
  const { t, lang, setLang, logout, firebaseReady } = useApp();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={t('settings')} compact />
      <View style={styles.panel}>
        <Text style={styles.heading}>Preferences</Text>
        <Row icon="🔔" label={t('notifications')} right={<Switch value />} />
        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>🌐 {t('language')}</Text>
          <View style={styles.languageRow}>
            {languages.map((item) => <Text onPress={() => setLang(item.code)} key={item.code} style={[styles.langChip, lang === item.code && styles.activeLang]}>{item.label}</Text>)}
          </View>
        </View>
        <Row icon="📍" label={t('locationServices')} right={<Switch value />} />
        <Text style={styles.heading}>Support</Text>
        <Row icon="?" label={t('help')} />
        <Row icon="🛡" label={t('privacy')} />
        <Row icon="ⓘ" label={t('terms')} />
        <Text style={styles.heading}>Backend</Text>
        <Text style={styles.backend}>{firebaseReady ? 'Firebase Auth + Firestore connected' : 'Demo mode running. Add .env Firebase keys for live backend.'}</Text>
        <Button title={`↪ ${t('logout')}`} variant="danger" onPress={logout} style={styles.logout} />
        <Text style={styles.version}>Part time Pathways v1.0 · 10% commission model</Text>
      </View>
    </ScrollView>
  );
}

function Row({ icon, label, right }) {
  return (
    <View style={styles.row}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.rowText}>{label}</Text>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  panel: { padding: 20 },
  heading: { fontSize: 24, fontWeight: '900', color: colors.text, marginTop: 18, marginBottom: 10 },
  row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 16 },
  icon: { width: 32, fontSize: 24, color: colors.muted, textAlign: 'center' },
  rowText: { flex: 1, fontSize: 20, color: colors.text, fontWeight: '700' },
  rowWrap: { marginVertical: 12 },
  rowLabel: { fontSize: 20, color: colors.text, fontWeight: '800', marginBottom: 10 },
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  langChip: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#ECEEF3', borderRadius: 12, color: colors.text, fontWeight: '800', overflow: 'hidden' },
  activeLang: { backgroundColor: colors.blue, color: colors.white },
  backend: { color: colors.muted, fontSize: 16, lineHeight: 24, backgroundColor: colors.white, padding: 14, borderRadius: 12 },
  logout: { marginTop: 24 },
  version: { color: colors.muted, textAlign: 'center', marginTop: 30, fontSize: 16 }
});
