/**
 * Queries
 */
import { AppSettingsQuery } from '../api/app/app.query.js'
import { ContactQuery } from "../api/contact/contact.query.js"
import { PostQuery } from "../api/post/post.query.js"
import { ProfileQuery } from '../api/profile/profile.query.js'
import { TagQuery } from '../api/tags/tags.query.js'

/**
 * Mutations
 */
import { AppSettingsMutation } from '../api/app/app.mutation.js'
import { ContactMutaion } from "../api/contact/contact.mutation.js"
import { UserMutaion } from '../api/user/user.mutation.js'
import { PostMutaion} from "../api/post/post.mutation.js";
import { ProfileMutation } from '../api/profile/profile.mutation.js'
import { TagMutation } from '../api/tags/tags.mutation.js'

export const resolvers = {
    Query: {
        ...AppSettingsQuery,
        // ...UserQuery,
        ...ContactQuery,
        ...PostQuery,
        ...ProfileQuery,
        ...TagQuery
    },
    Mutation: {
        ...AppSettingsMutation,
        ...ContactMutaion,
        ...UserMutaion,
        ...PostMutaion,
        ...ProfileMutation,
        ...TagMutation
    }
}