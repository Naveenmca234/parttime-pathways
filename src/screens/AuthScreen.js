import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import Field from '../components/Field';
import { colors, radius } from '../theme';
import { useApp } from '../context/AppContext';

export default function AuthScreen({ mode = 'login' }) {
  const { t, role, setRole, setScreen, login, register, loading, loginSocial, firebaseReady } = useApp();
  const [name, setName] = useState('Naveen');
  const [email, setEmail] = useState('demo@pathways.app');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 720);
  const isRegister = mode === 'register';

  const submit = () => {
    if (isRegister && password !== confirmPassword) return alert('Password and confirm password must match');
    if (isRegister) register({ name, email, password, chosenRole: role });
    else login({ email, password, chosenRole: role });
  };

  return (
    <LinearGradient colors={[colors.blue, colors.navy]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.inner, { maxWidth }]}> 
          <Pressable onPress={() => setScreen('welcome')}><Text style={styles.back}>←</Text></Pressable>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' }} style={styles.logo} />
          <Text style={styles.app}>{t('appName')}</Text>
          <View style={styles.panel}>
            <Text style={styles.title}>{isRegister ? t('register') : t('login')}</Text>
            <View style={styles.roleRow}>
              <Button title={t('worker')} variant={role === 'worker' ? 'primary' : 'secondary'} onPress={() => setRole('worker')} style={styles.roleButton} />
              <Button title={t('provider')} variant={role === 'provider' ? 'primary' : 'secondary'} onPress={() => setRole('provider')} style={styles.roleButton} />
            </View>
            {isRegister ? <Field label={t('fullName')} value={name} onChangeText={setName} placeholder="Enter your full name" /> : null}
            <Field label={t('email')} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
            <Field label={t('password')} value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry />
            {isRegister ? <Field label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm your password" secureTextEntry /> : null}
            <Button title={loading ? 'Please wait...' : isRegister ? t('register') : t('login')} onPress={submit} disabled={loading} style={styles.primary} />
            <View style={styles.socialRow}>
              <Button title="Google" variant="ghost" onPress={() => loginSocial('google')} style={styles.social} />
              <Button title="GitHub" variant="ghost" onPress={() => loginSocial('github')} style={styles.social} />
            </View>
            <Text style={styles.note}>{firebaseReady ? 'Firebase backend connected.' : t('demoMode')}</Text>
            <Pressable onPress={() => setScreen(isRegister ? 'login' : 'register')}>
              <Text style={styles.switch}>{isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center', padding: 24, paddingBottom: 40 },
  inner: { width: '100%' },
  back: { color: colors.white, fontSize: 34, marginBottom: 18 },
  logo: { width: 150, height: 150, borderRadius: 75, alignSelf: 'center', marginBottom: 18 },
  app: { color: colors.white, fontSize: 36, fontWeight: '900', textAlign: 'center', marginBottom: 32 },
  panel: { backgroundColor: 'rgba(255,255,255,0.14)', padding: 22, borderRadius: radius.lg },
  title: { color: colors.white, fontSize: 34, fontWeight: '900', textAlign: 'center', marginBottom: 18 },
  roleRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  roleButton: { flex: 1 },
  primary: { marginTop: 20 },
  socialRow: { flexDirection: 'row', gap: 12, marginTop: 14 },
  social: { flex: 1 },
  note: { color: 'rgba(255,255,255,0.82)', textAlign: 'center', marginTop: 14 },
  switch: { color: colors.white, fontSize: 16, fontWeight: '800', textAlign: 'center', marginTop: 20 }
});
