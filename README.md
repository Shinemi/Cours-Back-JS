# Cours création d'API REST avec Node et Express

Javascript vous permet de faire des sites / app coté front.
Il existe un outil qui vous permet d'utiliser vos compétences JS pour créer des projets BACK

Cela signifie donc que le code est bien exécuté côté SERVEUR.
--> l'utilisateur n'a PAS acces à votre code, contrairement à JS côté front

## Prérequis

- **Runtime** : Node.js installé sur votre machine (on va utiliser les modules ES)
- **Framework** : Express.js
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : JSON Web Tokens (jsonwebtoken), bcryptjs pour le hachage
- **Varaibles d'environnement** : Dotenv

## Mise en place de l'environnement de travail

### Initialisation du Projet

Tout d'abord on doit commencer par initialiser le projet NODE.
Pour cela vous devez entrer la commande npm init

Cette commande va créer un fichier package.json

Le package.json, contient des infos IMPORTANTES sur votre projet :
- le nom du projet
- le type de code utilisé (commonjs / ecma script (ES))
- Kes scripts du projet ( pour pouvoir le lancer, effectuer des tests, le déployer, etc)
- les dépendances du projet

#### les dépendances, c'est quoi ?

Pour fonctionner, le projet à besoin de certaines choses.
Dans le cas d'un projet avec express, il a besoin du framework express.
Si vous avez besoin de hacher les mot de passe , vous allez avoir besoin de la dépendance bcryptjs, etc..

Selon votre projet, vous n'allez pas forcément avoir les mêmes dépendances.
C'est le package.json qui s'occupe de gérer cela.

Vous, en tant que développeur, vous **installez** des dépendances grâce à la commande `npm install NomDeLaDependance`.

### Installation des dépendances nécessaires

```bash
npm install
npm i
```

Les deux commandes sont similaires. vous pouvez utiliser l'une ou l'autre, sachant que `npm i` ,c'est le raccourci de `npm install`.

- `npm i express` : Permet d'installer le framework express, pour pouvoir gérer directement un serveur back avec node.
- `npm i mongoose` : Permet de faire la connexion à la base de données mongoDB et de gérer les requêtes (CRUD).
- `npm i jsonwebtoken` : Permet de gérer un token d'authentification unique
- `npm i bcryptjs` : Permet de gérer les hash de mot de passe
- `npm i detenv` : Permet de gérer les varaibles d'environnement

#### Une variable d'environnement, c'est quoi ?

Une variable d'environnement est une donnée qui est potentiellement sensible.
En gros c'est: un mote de passe, une phrase secrète, des accès à une base de données, etc.
Ou tout simplement des variables qui servent à de la configuration pour votre app.

Sur nos webapp, les variables d'environnement sont créées dans un fichier `.env`

Exemple de contenu de variable d'environnement :

```
HOST=localhost
DBNAME=masuperdb
DBUSER=userquitue
DBPASS=monpasspourri
```

**IMPORTANT** : le fichier de variable d'environnment DOIT ABSOLUMENT être noté dans le fichier `.gitignore`

On n'envoi JAMAIS un fichier de variables d'environnement sur un GIThub.

Ce fichier doit contenir la structure attendue pour vos variables d'environnement.

exemple:
```
HOST=# nom d'hote pour la bdd
DBNAME=# nom de la bdd
DBUSER=# utilisateur de la bdd
DBPASS=# le pass de la bdd
```

### Structure des dossiers et fichiers

```text
    src/
        config/
            - db.js                   # Connexion a MongoDB
        controllers/                  # La logique de code de votre app
            - authController.js
        middlewares/                  # Tout ce qui s'execute avant un controller
            - authMiddlewares.js
        models/                       # Config des schémas de bdd
            - authModel.js
        routes/                       # Contient la logique des endpoints (url)
            - authRoutes.js

    - app.js                          # configuration de EXPRESS
- .env                                # Variables d'environnement
- package.json
- server.js                           # Point d'entrée de l'app
```
