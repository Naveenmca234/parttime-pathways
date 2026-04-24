import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function Field({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType = 'default', multiline, icon }) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputBox, multiline && styles.multilineBox]}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8C8F98"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          style={[styles.input, multiline && styles.multiline]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 9 },
  label: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 8 },
  inputBox: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.md,
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  multilineBox: { minHeight: 118, alignItems: 'flex-start', paddingTop: 10 },
  icon: { fontSize: 22, marginRight: 10, color: colors.muted },
  input: { flex: 1, color: colors.text, fontSize: 18, outlineStyle: 'none' },
  multiline: { minHeight: 95, textAlignVertical: 'top' }
});
