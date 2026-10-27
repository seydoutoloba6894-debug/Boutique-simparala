import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

const GREEN = '#063B2C';
const GOLD = '#F5BD2E';
const CATEGORIES = ['Tout', 'Cracheurs', 'Concassage', 'Moteurs', 'Pompes', 'Pièces de rechange', 'Outils'];

type Product = { id: string; name: string; category: string; description: string };
const PRODUCTS: Product[] = [
  { id: '1', name: 'Cracheur', category: 'Cracheurs', description: 'Demandez les modèles disponibles et leurs caractéristiques.' },
  { id: '2', name: 'Machine de concassage', category: 'Concassage', description: 'Demandez les capacités, dimensions et modèles disponibles.' },
  { id: '3', name: 'Moteur', category: 'Moteurs', description: 'Précisez la puissance ou le modèle recherché.' },
  { id: '4', name: 'Pompe à eau', category: 'Pompes', description: 'Demandez les modèles et caractéristiques disponibles.' },
  { id: '5', name: 'Pièces de rechange', category: 'Pièces de rechange', description: 'Envoyez le nom ou une photo de la pièce recherchée.' },
  { id: '6', name: 'Outils d’orpaillage', category: 'Outils', description: 'Contactez la boutique pour vérifier la disponibilité.' },
];
// À compléter par le propriétaire avant la mise en service. Ne pas publier de faux numéro.
const WHATSAPP_NUMBER = '';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tout');
  const [selected, setSelected] = useState<Product | null>(null);
  const [request, setRequest] = useState('');

  const filtered = useMemo(() => PRODUCTS.filter(p =>
    (category === 'Tout' || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  ), [search, category]);

  function contactWhatsApp(product?: Product) {
    if (!WHATSAPP_NUMBER) {
      Alert.alert('WhatsApp à configurer', 'Le numéro professionnel n’a pas encore été renseigné. Ajoutez-le dans app/index.tsx avant de publier l’application.');
      return;
    }
    const message = `Bonjour Boutique Simparala, je souhaite des informations sur : ${product?.name ?? 'un produit'}. ${request}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    // Linking is added once the business WhatsApp number is confirmed.
    Alert.alert('Demande prête', `Le numéro est configuré. Intégrez Linking.openURL("${url}") pour ouvrir WhatsApp.`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F3' }}>
      <View style={{ backgroundColor: GREEN, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 22, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 }}>
        <Text style={{ color: GOLD, fontSize: 13, fontWeight: '800', letterSpacing: 2 }}>BOUTIQUE</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: '900' }}>SIMPARALA</Text>
        <Text style={{ color: '#E5EEE8', marginTop: 6 }}>Matériels d’orpaillage et pièces de rechange</Text>
        <Text style={{ color: '#D7E6DD', marginTop: 8, fontSize: 12 }}>📍 Bozola, Bamako</Text>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 16, flex: 1 }}>
        {selected ? (
          <ScrollView>
            <Pressable onPress={() => setSelected(null)} style={{ paddingVertical: 8 }}><Text style={{ color: GREEN, fontWeight: '800' }}>‹ Retour au catalogue</Text></Pressable>
            <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 20, marginTop: 8 }}>
              <View style={{ backgroundColor: '#E6EEE8', height: 130, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 48 }}>⚙️</Text><Text style={{ color: GREEN, fontWeight: '700' }}>Photo à ajouter</Text></View>
              <Text style={{ fontSize: 23, fontWeight: '900', color: GREEN, marginTop: 16 }}>{selected.name}</Text>
              <Text style={{ color: '#647067', marginTop: 5 }}>{selected.category}</Text>
              <Text style={{ color: '#27342D', marginTop: 14, lineHeight: 22 }}>{selected.description}</Text>
              <View style={{ backgroundColor: '#FFF4CF', padding: 14, borderRadius: 12, marginTop: 18 }}><Text style={{ color: '#785700', fontWeight: '900', fontSize: 17 }}>Prix sur demande</Text><Text style={{ color: '#785700', marginTop: 4 }}>Le prix et la disponibilité seront confirmés par la boutique.</Text></View>
              <TextInput value={request} onChangeText={setRequest} placeholder="Votre question (facultatif)" multiline style={{ borderWidth: 1, borderColor: '#D9E0DB', backgroundColor: 'white', borderRadius: 12, padding: 12, marginTop: 16, minHeight: 70, textAlignVertical: 'top' }} />
              <Pressable onPress={() => contactWhatsApp(selected)} style={{ backgroundColor: GREEN, padding: 15, borderRadius: 12, marginTop: 14 }}><Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>Demander par WhatsApp</Text></Pressable>
            </View>
          </ScrollView>
        ) : (
          <>
            <Text style={{ color: GREEN, fontSize: 21, fontWeight: '900' }}>Nos produits</Text>
            <Text style={{ color: '#68746C', marginTop: 4, marginBottom: 14 }}>Choisissez un article pour demander le prix.</Text>
            <TextInput value={search} onChangeText={setSearch} placeholder="Rechercher un produit…" placeholderTextColor="#7D8981" style={{ backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#E0E5E0' }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 14, maxHeight: 42 }}>
              {CATEGORIES.map(c => <Pressable key={c} onPress={() => setCategory(c)} style={{ backgroundColor: category === c ? GREEN : 'white', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: category === c ? GREEN : '#DDE3DE' }}><Text style={{ color: category === c ? 'white' : GREEN, fontWeight: '700', fontSize: 12 }}>{c}</Text></Pressable>)}
            </ScrollView>
            <FlatList data={filtered} keyExtractor={item => item.id} contentContainerStyle={{ paddingBottom: 24 }} ListEmptyComponent={<Text style={{ color: '#68746C', padding: 20 }}>Aucun produit ne correspond à cette recherche.</Text>} renderItem={({ item }) => (
              <Pressable onPress={() => { setSelected(item); setRequest(''); }} style={{ backgroundColor: 'white', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E8ECE8' }}>
                <View style={{ width: 62, height: 62, backgroundColor: '#E8F0EA', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 27 }}>⚙️</Text></View>
                <View style={{ flex: 1, marginLeft: 12 }}><Text style={{ color: GREEN, fontWeight: '900', fontSize: 16 }}>{item.name}</Text><Text style={{ color: '#68746C', fontSize: 12, marginTop: 3 }}>{item.category}</Text><Text style={{ color: '#956B00', fontWeight: '800', marginTop: 6 }}>Prix sur demande</Text></View>
                <Text style={{ color: GREEN, fontSize: 24 }}>›</Text>
              </Pressable>
            )} />
          </>
        )}
      </View>
      <View style={{ backgroundColor: 'white', paddingVertical: 11, paddingHorizontal: 16, borderTopWidth: 1, borderColor: '#E2E7E2' }}><Text style={{ textAlign: 'center', color: '#667168', fontSize: 12 }}>Boutique Simparala • Bozola, Bamako</Text></View>
    </SafeAreaView>
  );
}
