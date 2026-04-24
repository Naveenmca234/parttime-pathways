import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Button from './Button';
import { colors } from '../theme';
import { money, calculateMoney } from '../services/store';

export default function JobCard({ job, actionLabel, onAction, statusLabel }) {
  const financials = calculateMoney(job.amount);
  return (
    <Card>
      <View style={styles.topRow}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.price}>{money(job.amount)}</Text>
      </View>
      <Text style={styles.meta}>📍 {job.location}</Text>
      <Text style={styles.meta}>🕘 {job.startTime} - {job.endTime}</Text>
      <Text style={styles.meta}>👥 Positions: {job.bookedWorkers || 0}/{job.workersNeeded || 1}</Text>
      <Text style={styles.meta}>⭐ Trust: {job.trustScore || 4.7} · {job.distanceKm || 2.1} km away</Text>
      <View style={styles.financialBox}>
        <Text style={styles.small}>10% commission: {money(financials.commissionAmount)}</Text>
        <Text style={styles.small}>Worker payout: {money(financials.workerPayout)}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>{job.date}</Text>
        {statusLabel ? <Text style={styles.status}>{statusLabel}</Text> : null}
        {actionLabel ? <Button title={actionLabel} onPress={onAction} style={styles.button} /> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: '900', flex: 1 },
  price: { color: colors.green, fontSize: 22, fontWeight: '900' },
  meta: { color: colors.muted, fontSize: 16, marginTop: 8 },
  financialBox: { backgroundColor: colors.greenSoft, padding: 10, borderRadius: 12, marginTop: 12 },
  small: { color: colors.text, fontSize: 13, fontWeight: '700' },
  footer: { borderTopWidth: 1, borderColor: colors.line, marginTop: 16, paddingTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  date: { color: colors.muted, fontSize: 16 },
  button: { minHeight: 44, paddingHorizontal: 18 },
  status: { color: '#1976D2', backgroundColor: '#E4F2FF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, fontWeight: '900', overflow: 'hidden' }
});
