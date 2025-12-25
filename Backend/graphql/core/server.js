import { ApolloServer } from '@apollo/server'
import schema from './schema.js'
import { initDBConnection } from './db.js'
import { mapSchema, getDirective, MapperKind, getDirectives } from '@graphql-tools/utils'
import jwt from 'jsonwebtoken'
import { find_user } from '../api/user/user.helper.js'

const tokens = ['dummyToken1', 'dummyToken2']

const AuthDirectiveTransformer = (schema, directiveName)=> {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig)=> {
            const authDirectives = getDirectives(schema,fieldConfig)
            const authDirective = getDirective(schema, fieldConfig, directiveName);
            if (authDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig
                const { role: SchemaRole = [] } = authDirective[0]


                fieldConfig.resolve = async (parent, args , context, info) => {
                    let { role } = context;
                    console.log("Context: ", context)
                    if (SchemaRole.length) { // Protected APIS
                          if(SchemaRole.includes(role)){
                            // throw new Error("You have not enough permissions !");
                            const result = await resolve(parent, args, context, info)
                            return result
                          }else { // Authentication Error
                            throw new Error("You have not enough permissions!");
                          }
                    } else { // Public APIS
                        const result = await resolve(parent, args, context, info)
                        return result
                    }
                    
                }
            }
        }
    })
}

export class GraphqlServer extends ApolloServer {
    constructor() {
        let schema_with_custom_directive = AuthDirectiveTransformer( schema, 'auth')
        super({
            csrfPrevention: false,
            introspection: true,
            schema: schema_with_custom_directive ,
            formatError: (err)=> {
                // console.log("Err: ", err)
                console.log("====== >> ", "Message: ", err.message, '\n', "PATH: ", JSON.stringify(err?.path || []), "\n", "STACKTRACE: ", JSON.stringify(err.extensions.stacktrace[1]), "<< ========")
                return {
                    message: err.message,
                    statusCode: 200 
                }
            }
        })
    }

    static async build () {
        await initDBConnection()
        return new GraphqlServer()
    }
}

export const InitializeGraphqlServer = async (event, context) => {
    let schema_with_custom_directive = AuthDirectiveTransformer( schema, 'auth')
    // await initDBConnection()
    const graphql_server = new ApolloServer({
        csrfPrevention: false,
            introspection: process.env.APP_STAGE === 'prod' ? false : true,
            // introspection: true,
            schema: schema_with_custom_directive ,
            formatError: (err)=> {
                // console.log("Err: ", err)

                console.log("====== >> ", "Message: ", err.message, '\n', "PATH: ", JSON.stringify(err?.path || []), "\n", "STACKTRACE: ", JSON.stringify(err.extensions.stacktrace[1]), "<< ========")
                return {
                    message: err.extensions.code  === 'BAD_USER_INPUT' ? err.extensions.code : err.message,
                    statusCode: 200 
                }
            }
    })

    await graphql_server.start()

    const context_function = async (event, context) => {
        const context_data = {
            email: "",
            role: "USER"
        }
        try {
            let Token = event.req.headers.authorization || event.req.headers.Authorization || '';
            // console.log("Token: ", Token)
            if( Token === ""){
                return context_data
            }else {
                Token = Token.split(" ")
                if(Token.length !== 2 || Token[0] !='Bearer') {
                    return context_data
                }
                if(Token[0] === 'Bearer') {
                    const jwt_token = Token[1];
                    const decodedPayload = jwt.verify(jwt_token, process.env.jwt_token_secret);
                    const { email, role } = decodedPayload;
                    if(email !== 'akashcsemu@gmail.com' || role !== 'ADMIN') {
                        return context_data
                        // throw new Error('Authentication error')
                    }
                    context_data.email = email;
                    context_data.role = role;
                    return context_data;
                }
            }   
        }catch(err) {
            console.log("Error: ", err)
            return context_data
        }
    }

    return {
        graphql_server: graphql_server,
        context_function: context_function
    }
}