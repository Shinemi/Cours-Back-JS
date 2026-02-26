# Cours création d'API REST avec Node et Express

JavaScript vous permet de faire des sites/app côté front.
Cependant, il existe un outil qui vous permet d'utiliser vos compétences JS
pour créer des projets BACK.

Cela signifie donc que le code est bien exécuté côté SERVEUR.
→ L'utilisateur n'a PAS accès à votre code, contrairement à JS côté FRONT

## Prérequis

- **Runtime** : Node.js installé sur votre machine (on va utiliser les modules ES)
- **Framework** : Express.js
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : JSON Web Tokens (jsonwebtoken), bcryptjs pour le hachage
- **Variables d'environnement** : dotenv

## Mise en place de l'environnement de travail

### Initialisation du projet

Tout d'abord on doit commencer par initialiser le projet NODE.
Pour cela, sur le terminal, vous devez entrer la commande `npm init`

Cette commande va vous créer un fichier `package.json`.

Le package.json, contient des informations IMPORTANTES sur votre projet :
- Le nom du projet
- Le type de code utilisé (commonjs (CJS) ou ecma script (ES))
- Les scripts du projet (pour pouvoir le lancer, effectuer des tests, le déployer, etc.)
- Les dépendances du projet

#### Les dépendances, c'est quoi ?

Pour fonctionner, votre projet a besoin de certaines choses.
Dans le cas d'un projet avec express, il a besoin du framework express.
Si vous avez besoin de hacher les mots de passe, vous allez avoir besoin de la dépendance bcryptjs, etc.

Selon votre projet, vous n'allez pas forcément avoir les mêmes dépendances. 
C'est le package.json qui s'occupe de gérer cela.

Vous, en tant que développeur, vous **installez** des dépendances grâce à la commande `npm install NomDeLaDépendance`.

### Installation des dépendances nécessaires

```bash
npm install
npm i
```

Les deux commandes sont similaires. Vous pouvez utiliser l'une ou l'autre, sachant que `npm i`, c'est le raccourci de `npm install`.

- `npm i express` : Permet d'installer le framework express, pour pouvoir gérer directement un serveur back avec node.
- `npm i mongoose` : Permet de faire la connexion à la base de données mongoDB et de gérer les requêtes (CRUD).
- `npm i jsonwebtoken` : Permet de gérer un token d'authentification unique
- `npm i bcryptjs` : Permet de gérer les hash de mot de passe
- `npm i dotenv` : Permet de gérer les variables d'environnement

#### Une variable d'environnement, c'est quoi ?

Une variable d'environnement est une donnée qui est potentiellement sensible.
En gros c'est : un mot de passe, une phrase secrète, des accès à une base de données, etc.
Ou tout simplement des variables qui servent à de la configuration pour votre app.

Sur nos webapp, les variables d'environnement sont créées dans un fichier `.env`

Exemple de contenu de variable d'environnement :

```
HOST=localhost
DBNAME=masuperdb
DBUSER=userquitue
DBPASS=monpasspourri
```

**IMPORTANT** : Le fichier de variable d'environnement DOIT ABSOLUMENT être noté dans le fichier `.gitignore`. 

On n'envoie JAMAIS un fichier de variables d'environnement sur github.

Par contre, ce que vous pouvez faire pour votre projet, c'est créer un fichier `.env.example` que vous pouvez envoyer sur github.

Ce fichier doit contenir la structure attendue pour vos variables d'environnement.

Exemple : 
```
HOST=# Nom d'hôte pour la base de données
DBNAME=# Nom de la base de données
DBUSER=# Utilisateur de la base de données
DBPASS=# Le pass de la base de données.
```

### Structure des fichiers et dossiers

```text
    src/
        config/
            - db.js                     # Connexion à MongoDB
        controllers/                    # La logique de code de votre app
            - authController.js
        middlewares/                    # Tout ce qui s'exécute avant un controller
            - authMiddleware.js
        models/                         # Configuration des schémas de base de données
            - authModel.js
        routes/                         # Contient la logique des endpoints (url)
            - authRoutes.js
    - app.js                            # Configuration de Express
- .env                                  # Variables d'environnement
- package.json
- server.js                             # Point d'entrée de l'app
```

## Rôle de chaque dossier

### Les routes : Le standard téléphonique / L'aiguilleur

- **C'est quoi ?** C'est le point d'entrée de votre API. Les routes définissent les URL ou endpoints accessibles par les utilisateurs (ex : `GET /api/quotes` ou `POST /api/auth/login`).
- **Leur rôle :** Lorsqu'une personne (ou le frontend) fait une requête vers votre API, la route reçoit cet appel, comprend ce que l'utilisateur veut faire, et dirige l'appel vers le bon **Controller**. Une route ne contient aucune logique complexe, elle se contente de transférer la demande à la bonne personne.

### Les models

- **C'est quoi ?** Le modèle est la représentation structurelle de vos données en code. Il fait le lien (grâce à Mongoose) avec la base de données MongoDB. 
- **Son rôle :** Il définit le schéma de vos données. C'est lui qui décide qu'un utilisateur doit avoir un email, par exemple (de type chaîne de caractères, défini comme obligatoire et unique). C'est le modèle qui se charge de faire toutes les actions d'écriture et de lecture directes dans la base de données (le fameux CRUD).

### Les controllers : Le cerveau / le manager

- **C'est quoi ?** C'est ici que se trouve la logique métier de votre application.
- **Son rôle :** Le contrôleur reçoit la demande transmise par la route. C'est lui qui fait le travail. Il lit les informations envoyées par l'utilisateur (le body), il demande au **model** d'interagir avec la base de données, puis **prépare et renvoie la réponse** finale à l'utilisateur au format JSON en gérant les différents cas de succès ou d'erreurs.

### Les middlewares : La douane / le vigile

- **C'est quoi ?** C'est une fonction qui s'exécute **au milieu** (middle) de la requête. Elle a lieu juste après que la route ait été appelée, mais juste avant que la requête n'arrive finalement dans le controller.
- **Son rôle :** Il effectue des vérifications à la volée. L'exemple le plus courant en API est le **middleware d'authentification** : il vérifie qu'un utilisateur possède un token valide (la "carte d'identité") avant de le laisser accéder à des informations privées. S'il n'a pas son ticket, la douane bloque tout et renvoie une erreur (401 - Accès refusé). Si tout va bien, il appelle une fonction `next()` qui laisse passer la requête vers le controller.

## Résumé des commandes pour un nouveau projet et configuration

### Résumé

```bash
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcryptjs
npm i dotenv
```

Vous pouvez installer tout en une seule fois, après `npm init` :
`npm i express mongoose jsonwebtoken bcryptjs dotenv`.

### Configuration

Ouvrir le fichier package.json, et faire en sorte d'avoir la ligne `"type": "module"`.

### Petite astuce

Lorsque vous allez démarrer votre serveur avec la commande `node server` ou `npm run dev` si vous avez configuré le script. Votre serveur sera lancé et figé à l'état du lancement.

Ce qui signifie, que si vous effectuez une modification sur votre code, vous allez devoir couper le serveur et le relancer. Ce qui peut être pénible.

Pour éviter cette manipulation, vous pouvez installer de manière globale l'outil nodemon. 
Pour cela, vous le faites UNE SEULE FOIS sur votre machine : `npm i -g nodemon`.

Cette fois-ci, au lieu de lancer votre serveur avec `node server`, vous allez le lancer avec `nodemon server`. Ce qui aura pour effet qu'à chaque modification de votre code, le serveur se recharge automatiquement.