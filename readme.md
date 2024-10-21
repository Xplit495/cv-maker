```
 ________  ___      ___      _____ ______   ________  ___  __    _______   ________     
|\   ____\|\  \    /  /|    |\   _ \  _   \|\   __  \|\  \|\  \ |\  ___ \ |\   __  \    
\ \  \___|\ \  \  /  / /    \ \  \\\__\ \  \ \  \|\  \ \  \/  /|\ \   __/|\ \  \|\  \   
 \ \  \    \ \  \/  / /      \ \  \\|__| \  \ \   __  \ \   ___  \ \  \_|/_\ \   _  _\  
  \ \  \____\ \    / /        \ \  \    \ \  \ \  \ \  \ \  \\ \  \ \  \_|\ \ \  \\  \| 
   \ \_______\ \__/ /          \ \__\    \ \__\ \__\ \__\ \__\\ \__\ \_______\ \__\\ _\ 
    \|_______|\|__|/            \|__|     \|__|\|__|\|__|\|__| \|__|\|_______|\|__|\|__|                                                                                
```

# **CV Maker**

Ce projet est une application web permettant aux utilisateurs de créer un cv en ligne. L'application est construite en **PHP** avec une base de données **SQLite** pour stocker les informations des utilisateurs. La partie front-end utilise **HTML**, **CSS**, et **JavaScript** pour gérer les interactions dynamiques (modification des informations du profil) et l'affichage des données.

## **Fonctionnalités**

- **Inscription et Connexion** : Les utilisateurs peuvent créer un compte et se connecter avec leur email et mot de passe.
- **Gestion du profil** :
    - Les utilisateurs peuvent modifier leur nom, prénom, email et mot de passe directement depuis l'interface.
    - Le formulaire permet d'éditer ces champs individuellement avec une confirmation de la mise à jour.
- **Déconnexion** : Les utilisateurs peuvent se déconnecter, et leur session sera détruite.
- **Protection des routes** : Certaines pages comme le tableau de bord et la gestion du profil sont accessibles uniquement après connexion.
- **Validation côté serveur et client** : Les données sont validées à la fois dans le navigateur et sur le serveur avant d'être enregistrées.
- **Gestion des sessions** : Les utilisateurs restent connectés grâce à une gestion des sessions PHP.

## **Technologies Utilisées**

- **PHP** (Back-end)
- **SQLite** (Base de données)
- **HTML/CSS/JavaScript** (Front-end)
- **Fetch API** (pour les appels AJAX côté client)
- **Sessions PHP** (pour la gestion de l'authentification)

## **Prérequis**

- **PHP** version 7.4 ou plus récent.
- **SQLite** pour la base de données.
- **Nginx/Apache** (ou un autre serveur web) avec PHP configuré.
- **Docker** (facultatif) pour exécuter l'application dans un environnement conteneurisé.

## **Installation**

### 1. Clone du projet

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/Xplit495/cv-maker.git
cd cv-maker
```

### 2. Configuration de la base de données

La base de données SQLite est utilisée pour stocker les informations des utilisateurs. Un fichier `database.sqlite` devrait être situé dans le dossier `/backend/data/`.

Si le fichier n'existe pas encore, créez-le :

```bash
cd backend/data
touch database.sqlite
```

Ensuite, créez la table user dans la base de données. Vous pouvez utiliser un fichier SQL pour initialiser la table avec le schéma suivant :

```sql
CREATE TABLE user (
id TEXT PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
);
```

### 3. Configuration du docker

Pour exécuter l'application dans un environnement conteneurisé, vous pouvez utiliser Docker. Un fichier `Dockerfile` est fourni pour construire l'image Docker ainsi qu'un fichier `docker-compose.yml` pour lancer le conteneur.

Pour lancer le projet rendez-vous à la racine du projet et exécutez la commande suivante :

```bash
docker-compose up
```