import express from 'express'
// import StripeWebhookRoute from "./webhooks/stripe/stripe.webhook.route.js";
// import { get_google_consent_access_token } from '../graphql/api/social_media/social_media.helper.js';
// import { GenerateAccessToken } from '../graphql/api/social_media/social_media.service.js'
export const InitializeExpressApp = async ()=> {
    // console.log("Express App called")
    const app = express()
    // console.log("After express funcitoin called")
    // app.use('/webhook/stripe', StripeWebhookRoute);
    app.get('/test', async (req, res, next)=> {
        console.log(req.query)
        return {
            message: "Hello world!!"
        }
        return res.status(200).json({
            message: 'Hello World !!'
        })
    })
    app.get("/auth/youtube", async (req, res, next)=> {
        const { code, scope, state }= req.query; // Here State is custome value provide from server to get back in callback function through frontend to backend also 
        // const service_data = await GenerateAccessToken({ code, state, platform: "YOUTUBE" })
        // console.log("CODE: ", code)
        // console.log("Scope ", scope)
        // console.log("STATE", state)
        // const { platform, userId } = JSON.parse(state);
        // await get_google_consent_access_token({ code:code, userId: userId, platform: platform, scopes: scope })
        return res.status(200).json({
            message: "Hello World!!"
        })  
    })

    return {
        express_app: app
    }
}