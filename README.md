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

## Rôle de chaque dossiers

### Les routes : le standard téléphonique / l'aiguilleur

- **C'est quoi** C'est le point d'entrée de votre API. Les routes définissent les URL ou endpoints accessibles par les utilisateurs (ex : `GET /api/quotes` ou `POST /api/auth/login`).

- **Leur rôle :** Lorsqu'une personne (ou le frontend) fait une requête vers votre API, la route recoit cet appel, comrpend que l'utilisateur veut faire, et dirige l'appel vers le bon **Controller**. Une route ne contient aucune logique compelxe, elle se contente de transférer la demande à la bonne personne.

### Les models

- **C'est quoi ?** Le model est la représentation structurelle de vos données en code. Il fait le lien (grace a Mongoose) avec la base de donnees MongoDB.
- **Son rôle :** Il définit le schéma de vos donnée. c'est lui qui décide qu'un utilisateur doit avoir un email, par exemple (de type chaine de caractere, défini comme obligatoire et unique). C'est le modèle qui se charge faire toutes les actions d'écriture et de lecture directes dans la base de données (le fameux CRUD).

### Les controllers : Le cerveau / le manageur

- **C'est quoi ?** C'est ici que se trouve la logique métier de votre application.
- **Son rôle :** Le controller recoit la demande transmise par la route. C'est lui qui dait le travail. il Lit les infos envoyées par l'utilisateur (le body), il demande au **model** d'intéragir avec la base de données, puis **prépare et renvoie la réponse** finale à l'utilisateur au format JSON en gérant les différents cas de succès ou d'erreurs.

### Les Middlewares : La douane / le vigile

- **C'est quoi ?** C'est une fonction qui s'execute **au milieu** (middle) de la requete.
Elle à lieu juste apres que la route ait été appelée, mais juste avant que la requete n'arrive finalement dans le controller.
- **Son rôle :** Il effectuedes vérifications à la volée. l'exemple le plus courant en API est le **middleware d'authentification** : il vérifie qu'un utilisateur possède un token valide (la "carte d'identité") avant de le laisser accéder à des informations privées.
S'il n'a pas son ticket, la douane  bloque tout et renvoie une erreur (401- acces refusé)
Si tout va bien, il appel une fonction `next()` qui laisse passer la requete vers le controller.

## résumé des commandes pour un nouveau projet et configuration

### résumé
```
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcryptjs
npm i dotenv
```

vous pouvez installer tout en une seule fois, apres `npm init` :
`npm i express mongoose jsonwebtoken bcryptjs dotenv`

### Configuration

Ouvrir le fichier package.json, et faire en sorte d'avoir la ligne `"type" : "module"`

### Petite astuce

Lorque vous allez démarrer votre serveur avec la commande `node serveur` ou `npm run dev`
si vous avez configuré le script. votre serveur sera lancé et figé à l'état du lancement.

ce qui signifie, que si vous effectuez une mofification sur votre code, vous allez devoir couper le serveur et le relancer. ce qui peut être pénible.

Pour éviter cette manip, vous pouvez installer de manière globale l'outil nodemon.
Pour cela, vous le faite UNE SEULE FOIS sur votre machine : `npm i -g nodemon`.

Cette fois ci, au lieu de lancer votre serveur avec `node serveur`, vous allez le lancer avec `nodemon server`. Ce qui aura pour effet, qu'a chaque modification de votre code, le serveur se recharge automatiquement.