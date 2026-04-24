import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { money } from '../services/store';

export default function BookingsScreen() {
  const { t, bookings, updateBooking } = useApp();
  const [status, setStatus] = useState('upcoming');
  const filtered = useMemo(() => bookings.filter((item) => item.status === status), [bookings, status]);
  const tabs = ['upcoming', 'completed', 'cancelled'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title={t('myBookings')} compact />
      <View style={styles.tabs}>
        {tabs.map((item) => (
          <Pressable key={item} onPress={() => setStatus(item)} style={[styles.tab, status === item && styles.activeTab]}>
            <Text style={[styles.tabLabel, status === item && styles.activeLabel]}>{t(item)}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.list}>
        {filtered.map((booking) => (
          <Card key={booking.id}>
            <View style={styles.topRow}>
              <Text style={styles.title}>{booking.title}</Text>
              <Text style={styles.price}>{money(booking.amount)}</Text>
            </View>
            <Text style={styles.meta}>📍 {booking.location}</Text>
            <Text style={styles.meta}>📅 {booking.date}</Text>
            <Text style={styles.meta}>🕘 {booking.startTime} - {booking.endTime}</Text>
            <Text style={styles.meta}>💼 Payout after 10% commission: {money(booking.workerPayout)}</Text>
            <View style={styles.footer}>
              {status === 'upcoming' ? <Button title={`× ${t('cancel')}`} variant="danger" onPress={() => updateBooking(booking, 'cancelled')} /> : null}
              {status === 'upcoming' ? <Button title={t('completed')} variant="ghost" onPress={() => updateBooking(booking, 'completed')} /> : null}
              <Text style={styles.badge}>{t(status)}</Text>
            </View>
          </Card>
        ))}
        {filtered.length === 0 ? <Text style={styles.empty}>No {status} bookings yet.</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 24 },
  tabs: { backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: colors.line },
  tab: { paddingVertical: 18, flex: 1, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: colors.blue },
  tabLabel: { fontSize: 17, fontWeight: '800', color: colors.muted },
  activeLabel: { color: colors.blue },
  list: { padding: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '900', color: colors.text, flex: 1 },
  price: { fontSize: 22, fontWeight: '900', color: colors.green },
  meta: { fontSize: 16, color: colors.muted, marginTop: 8 },
  footer: { borderTopWidth: 1, borderColor: colors.line, marginTop: 16, paddingTop: 14, flexDirection: 'row', gap: 10, alignItems: 'center', flexWrap: 'wrap' },
  badge: { color: '#1976D2', backgroundColor: '#E4F2FF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, fontWeight: '900', overflow: 'hidden' },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 40, fontSize: 18 }
});
