import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function Chip({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: '#EFEFEF', borderRadius: radius.xl, paddingHorizontal: 18, paddingVertical: 12, marginRight: 10 },
  active: { backgroundColor: colors.blue },
  label: { color: colors.muted, fontSize: 16, fontWeight: '800' },
  activeLabel: { color: colors.white }
});
