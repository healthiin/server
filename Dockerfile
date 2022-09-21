FROM node:16-alpine as base
WORKDIR /app
COPY . .
ARG APP_PORT
EXPOSE ${APP_PORT}
RUN yarn

FROM base as production
RUN yarn build
CMD ["node", "dist/main"]

FROM base as development
CMD ["yarn", "start:dev"]
