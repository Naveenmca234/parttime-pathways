import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { colors } from '../theme';

export default function StatsCard({ icon, value, label }) {
  return (
    <Card style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 130, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5, padding: 12 },
  icon: { fontSize: 32, color: colors.blue },
  value: { fontSize: 26, fontWeight: '900', color: colors.text, marginTop: 8 },
  label: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 5 }
});
