import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function Button({ title, onPress, variant = 'primary', style, textStyle, disabled }) {
  const buttonStyle = [styles.base, styles[variant], disabled && styles.disabled, style];
  const labelStyle = [styles.text, variant === 'ghost' && styles.ghostText, variant === 'danger' && styles.dangerText, textStyle];
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={({ pressed }) => [buttonStyle, pressed && !disabled ? styles.pressed : null]}>
      <Text style={labelStyle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: { backgroundColor: colors.green },
  secondary: { backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.26)' },
  chip: { backgroundColor: colors.blueSoft, minHeight: 42, paddingVertical: 9 },
  danger: { backgroundColor: colors.redSoft },
  ghost: { backgroundColor: '#F0F2F6' },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
  text: { color: colors.white, fontSize: 17, fontWeight: '800' },
  ghostText: { color: colors.text },
  dangerText: { color: '#D84444' }
});
