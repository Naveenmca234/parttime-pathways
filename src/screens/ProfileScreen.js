import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Chip from '../components/Chip';
import StatsCard from '../components/StatsCard';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { money } from '../services/store';

export default function ProfileScreen() {
  const { t, user, role, metrics } = useApp();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient colors={[colors.blue, colors.navy]} style={styles.header}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80' }} style={styles.avatar} />
        <Text style={styles.name}>{user?.name || 'Naveen'}</Text>
        <Text style={styles.role}>{role === 'provider' ? t('provider') : t('worker')}</Text>
      </LinearGradient>
      <View style={styles.body}>
        <Card>
          <Text style={styles.cardTitle}>{t('location')}</Text>
          <Text style={styles.value}>📍 {user?.location || t('noLocation')}</Text>
        </Card>
        <Card>
          <Text style={styles.cardTitle}>{t('about')}</Text>
          <Text style={styles.value}>{user?.bio || t('noBio')}</Text>
        </Card>
        <Card>
          <Text style={styles.cardTitle}>{t('interests')}</Text>
          <View style={styles.chipRow}>
            {(user?.interests || ['construction', 'delivery']).map((item) => <Chip key={item} label={t(item)} active />)}
          </View>
        </Card>
        <View style={styles.statsRow}>
          <StatsCard icon="⭐" value={user?.trustScore || 4.7} label={t('trust')} />
          <StatsCard icon="₹" value={role === 'provider' ? money(metrics.spent) : money(metrics.earnings)} label={role === 'provider' ? t('spent') : t('earnings')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  header: { paddingTop: 48, paddingBottom: 34, alignItems: 'center' },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 5, borderColor: colors.white },
  name: { color: colors.white, fontSize: 36, fontWeight: '900', marginTop: 18 },
  role: { color: colors.white, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, marginTop: 10, fontSize: 18, fontWeight: '800', overflow: 'hidden' },
  body: { padding: 16 },
  cardTitle: { fontSize: 22, fontWeight: '900', color: colors.text, marginBottom: 12 },
  value: { color: colors.muted, fontSize: 18, lineHeight: 28 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statsRow: { flexDirection: 'row', gap: 8 }
});
