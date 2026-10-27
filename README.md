# Boutique Simparala — première version Android

Application de départ Expo / React Native pour un catalogue de matériels d’orpaillage.

## Déjà prévu
- Catalogue par catégories : cracheurs, concassage, moteurs, pompes, pièces et outils.
- Recherche et filtres par catégorie.
- Fiche produit et champ pour une question.
- Affichage « Prix sur demande » sans inventer de prix.
- Localisation affichée : Bozola, Bamako.
- Garde-fou tant que le numéro WhatsApp n’est pas renseigné.

## Avant utilisation commerciale
1. Ajouter le vrai numéro WhatsApp professionnel dans `app/index.tsx`, dans `WHATSAPP_NUMBER`, au format international sans `+` ni espaces (ex. indicatif pays + numéro, mais ne pas utiliser un numéro d’exemple).
2. Installer `expo-linking` et remplacer l’alerte temporaire de `contactWhatsApp` par `Linking.openURL(url)`.
3. Remplacer les icônes provisoires par les vraies photos, vérifier les descriptions et ajouter les produits réellement disponibles.
4. Tester les liens, les appareils Android et les commandes avant de publier.

## Lancer le projet (avec ordinateur)
- Installer Node.js LTS.
- Dans ce dossier : `npm install`
- Lancer : `npx expo start`
- Installer Expo Go sur un téléphone compatible et scanner le QR code sur le même réseau.

Ce dossier est le code source de départ, pas encore un APK compilé. Il faut une étape de compilation et de test pour produire un APK installable.
