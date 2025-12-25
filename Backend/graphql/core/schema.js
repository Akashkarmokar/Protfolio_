import { makeExecutableSchema } from '@graphql-tools/schema'

/**
 * Schemas
 */
import { AppSettingsSchema } from '../api/app/app.schema.js';
import { ContactSchema } from "../api/contact/contact.schema.js";
import { PostSchema } from '../api/post/post.schema.js';
import { ProfileSchema } from '../api/profile/profile.schema.js';
import { TagSchema } from '../api/tags/tags.schema.js';
import { UserSchema } from '../api/user/user.schema.js';

/**
 * Resolvers
 */
import { resolvers } from './resolvers.js'

const AllTypeDefs = [
    AppSettingsSchema,
    ContactSchema,
    PostSchema,
    ProfileSchema,
    TagSchema,
    UserSchema,
]

let schema;
export default schema   = makeExecutableSchema({
    typeDefs: AllTypeDefs,
    resolvers: resolvers,
})