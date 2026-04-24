import React from 'react';
import { SafeAreaView, View, StyleSheet, useWindowDimensions } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import JobsScreen from './src/screens/JobsScreen';
import BookingsScreen from './src/screens/BookingsScreen';
import PostJobScreen from './src/screens/PostJobScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BottomNav from './src/components/BottomNav';
import { colors } from './src/theme';

function Main() {
  const { screen, tab, setTab, lang } = useApp();
  const { width } = useWindowDimensions();
  const maxWidth = width > 900 ? 760 : width;

  if (screen === 'welcome') return <WelcomeScreen />;
  if (screen === 'language') return <LanguageScreen />;
  if (screen === 'login') return <AuthScreen mode="login" />;
  if (screen === 'register') return <AuthScreen mode="register" />;

  const Screen = {
    home: HomeScreen,
    jobs: JobsScreen,
    bookings: BookingsScreen,
    post: PostJobScreen,
    profile: ProfileScreen,
    settings: SettingsScreen
  }[tab] || HomeScreen;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.shell, { maxWidth }]}> 
        <View style={styles.main}><Screen /></View>
        <BottomNav active={tab} onChange={setTab} lang={lang} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#DDE4F2', alignItems: 'center' },
  shell: { flex: 1, width: '100%', backgroundColor: colors.bg },
  main: { flex: 1 }
});
