import {LambdaFunctionHandler} from '../../graphql/handler.js'

const Event = {
    path: '/graphql',
    headers: {
        'Content-Type': 'application/json'
    }
}


export const PublicQueryClient = async (schemaDefination, inputdata) => {

    let event = {
        path: '/graphql', // Specify the path to trigger your GraphQL endpoint
        httpMethod: 'POST', // Most GraphQL requests are POST requests
        body: schemaDefination,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (inputdata) {
        event.variables = inputdata
    }

    let context = {
        callbackWaitsForEmptyEventLoop: false
    };
    const result = await LambdaFunctionHandler(event, context)
    return result
}

export const Client = async (schema_definition, inputData) => {
    let event =  {
        path: '/graphql',
        headers: {
            'Content-Type': 'application/json'
        },
        httpMethod: 'POST',
        body: JSON.stringify({

            query: schema_definition,
            variables: inputData ? {inputData} : undefined
        })
    }
    let context = {
        callbackWaitsForEmptyEventLoop: false,
    }

    return await LambdaFunctionHandler(event, context)
}