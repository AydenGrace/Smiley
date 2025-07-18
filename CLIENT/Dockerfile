# Type de container
FROM node:lts-alpine
# Endroit où on va travailler dans le container
WORKDIR /app 
# On copie le fichier dans l'aplacement du WORKDIR
COPY package.json .
# On installe les dépendance
RUN npm i
# On copie le reste du projet
COPY . .
# Indication du port
EXPOSE 5173
# On lance le script, host est nécessaire avec vite pour rendre le service accessible à l'extérieur du container
CMD [ "npm","run","dev","--","--host" ]
