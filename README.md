base.gruntproject
=================

Base for integration with Grunt

## Installation

Dépendances : Node.js, Grunt.js, Compass

### Node, NPM
http://nodejs.org/

MacOSX via homebrew 

```
brew install npm
```
ou par l'installateur officiel (Win, Mac) : http://nodejs.org/download/

### Grunt

```
npm install -g grunt-cli
```

### Installation des modules Grunt

Aller dans la racine du repertoire et lancer la commande suivante :

```
npm install
```

###Si vous ovrez le projet pour la 1ere fois

Pour générer les images, fichiers minifiés

```
grunt build
```

### Serveur de développement

Il s'agit d'un serveur express.js, le terminal doit rester ouvert.

```
grunt server
```

La compilation des fichiers .js et .sass s'effectue en temps réel par grunt.
Les images sont minifiées.


### Building

Avant chaque déploiement, les fichiers .js et .sass doivent être minifiés et concaténés.

```
grunt build
```

### Working

Dans public, la seule chose à éditer est index.html et le dossier des fonts.
Tous les autres fichiers de travail se trouvent dans src.




