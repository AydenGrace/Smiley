# Type de container
FROM node:alpine
# Endroit où on va travailler dans le container
WORKDIR /app 
# On copie le fichier dans l'aplacement du WORKDIR
COPY package.json .
# On installe les dépendance
RUN npm i
# On copie le reste du projet
COPY . .
# Indication du port
EXPOSE 5000
# On lance le script
CMD [ "npm","start" ]
