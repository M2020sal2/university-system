FROM node:21.1.0 as base


# development

FROM base as development
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run","dev"]



# production

FROM base as production
WORKDIR /app
COPY /package.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]