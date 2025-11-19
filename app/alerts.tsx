import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useInventory } from '../contexts/InventoryContext';

export default function AlertsPage() {
  const { inventoryItems } = useInventory();
  const router = useRouter();

  const alerts = inventoryItems.filter((it) => {
    // simple rule: show items with progress <= 0.4
    const now = Date.now();
    const created = it.createdAt.getTime();
    const expires = it.expiresAt.getTime();
    const total = expires - created;
    const remaining = Math.max(0, expires - now);
    const progress = total <= 0 ? 0 : Math.max(0, Math.min(1, remaining / total));
    return progress <= 0.4;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      {alerts.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>No alerts</Text></View>
      ) : (
        alerts.map((it) => (
          <View key={it.id} style={styles.card}>
            <Text style={styles.cardTitle}>{it.name}</Text>
            <Text style={styles.cardText}>Expires: {it.expiresAt.toLocaleString()}</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/inventory')}>
              <Text style={styles.buttonText}>Open Inventory</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.light.text, marginBottom: 12 },
  empty: { alignItems: 'center', padding: 24, backgroundColor: '#FFF7ED', borderRadius: 12 },
  emptyText: { color: 'rgba(17,24,28,0.7)' },
  card: { backgroundColor: '#FFF7ED', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(244,162,97,0.18)' },
  cardTitle: { fontWeight: '800', color: Colors.light.tint },
  cardText: { color: 'rgba(17,24,28,0.8)', marginTop: 6 },
  button: { marginTop: 8, backgroundColor: Colors.light.tint, padding: 10, borderRadius: 10, alignSelf: 'flex-start' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
