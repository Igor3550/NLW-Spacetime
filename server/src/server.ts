import 'dotenv/config'
import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';

import { authRoutes } from './routers/auth';
import { memoriesRoutes } from './routers/memories';
import { uploadRoutes } from './routers/upload';
import { resolve } from 'node:path';

const app = fastify();

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

app.register(cors, {
  origin: true // ['http://localhost:3000']
})
app.register(jwt, {
  secret: 'spacetime'
})
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then(() => {
  console.log("Listen on 3333")
});
