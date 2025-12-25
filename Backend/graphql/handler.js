import express from 'express'
import serverless from 'serverless-http'
import { expressMiddleware } from '@apollo/server/express4'
import { initDBConnection } from '../graphql/core/db.js'
import { InitializeGraphqlServer } from './core/server.js'
import { InitializeExpressApp } from '../express/server.js'
import cors from 'cors'
import 'dotenv/config'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let express_app;
let serverlessHandler;
let initialized = false;

async function globalInit(event, context) {
  await initDBConnection();
  const { express_app: app } = await InitializeExpressApp();
  const { graphql_server, context_function } = await InitializeGraphqlServer(event, context);

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(
      graphql_server,
      { context: context_function }
    )
  );
  express_app = app;
  serverlessHandler = serverless(express_app);
  initialized = true;
}

export const LambdaFunctionHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!initialized) {
    await globalInit(event, context);
  }
  // Optionally silence logs in test
  // console.log = () => {};
  if(process.env.APP_STAGE == 'prod') {
    console.log(()=> {})
  }
  return serverlessHandler(event, context);
}