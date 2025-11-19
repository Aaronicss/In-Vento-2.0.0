import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TileHome() {
  const router = useRouter();

  const tiles = [
    { key: 'inventory', label: 'Inventory', route: '/(tabs)/inventory' },
    { key: 'orders', label: 'Orders', route: '/orders' },
    { key: 'take-order', label: 'Take Order', route: '/take-order' },
    { key: 'alerts', label: 'Alerts', route: '/alerts' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IN-VENTO</Text>
      <Text style={styles.subtitle}>Quick Navigation</Text>

      <View style={styles.grid}>
        {tiles.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={styles.tile}
            onPress={() => router.push(t.route as any)}
          >
            <Text style={styles.tileLabel}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.light.text,
    marginTop: 20,
  },
  subtitle: {
    color: 'rgba(17,24,28,0.7)',
    marginBottom: 16,
  },
  grid: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    height: 120,
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(244,162,97,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  tileLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light.tint,
  },
});
