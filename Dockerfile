# Étape 1 : Build React
FROM node:18 AS build
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source (y compris .env)
COPY . ./

# Exécuter la commande pour construire l'application React
RUN npm run build

# Étape 2 : Utiliser NGINX pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape de build vers NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour NGINX
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
