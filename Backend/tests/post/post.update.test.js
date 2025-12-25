import { Client  } from '../utils/client.js'
import * as chai from 'chai'
const expect = chai.expect

import { delete_post, create_a_single_post} from '../../graphql/api/post/post.repository.js'
describe('Update A Post', () => {

    beforeEach(() => {
        // Mock AWS Lambda event for /graphql path

    });

    it('should return a Error of "id is required" while updated a post', async () => {

        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});

        const post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });
        const Mutation =
            `mutation Mutation($inputData: UpdatePostInput) {
                UpdatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            // id: post._id,
            status: "DRAFT"
        }

        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        expect(response).to.be.an('object');
        const { errors } = response
        expect(errors).to.be.an('array');
        expect(errors).to.have.length(1);

        const [ message_body ] =  errors;
        expect(message_body).to.be.an('object');

        const { message } = message_body
        expect(message).to.be.an('string');
        expect(message).to.equal('id is required');
        //
        // const { PostListing } = data;
        // expect(PostListing).to.be.an('array');
        // expect(PostListing).to.have.lengthOf(2);
        //
        // PostListing.forEach((post) => {
        //     expect(post).to.have.property('title').that.is.a('string');
        //     expect(post).to.have.property('content').that.is.a('string');
        //     expect(post).to.have.property('status').that.is.a('string');
        // })
    });
    it('should return a Error of "post not found" while updated a post', async () => {

        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});

        const post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });
        // console.log("CREATED : ", post);
        const Mutation =
            `mutation Mutation($inputData: UpdatePostInput) {
                UpdatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            id: post._id + "x", // wrong id
            status: "DRAFT"
        }

        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        expect(response).to.be.an('object');

        console.log(response);
        const { errors } = response
        expect(errors).to.be.an('array');
        expect(errors).to.have.length(1);

        const [ message_body ] =  errors;
        expect(message_body).to.be.an('object');

        const { message } = message_body
        expect(message).to.be.an('string');
        expect(message).to.equal('post not found');
        //
        // const { PostListing } = data;
        // expect(PostListing).to.be.an('array');
        // expect(PostListing).to.have.lengthOf(2);
        //
        // PostListing.forEach((post) => {
        //     expect(post).to.have.property('title').that.is.a('string');
        //     expect(post).to.have.property('content').that.is.a('string');
        //     expect(post).to.have.property('status').that.is.a('string');
        // })
    });

    it('should return a Error of "title is required" while updated a post', async () => {

        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});

        const post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: 'short_preview_content'
        });
        const Mutation =
            `mutation Mutation($inputData: UpdatePostInput) {
                UpdatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            id: post._id,
            status: "DRAFT",
            content: "Example Content"
        }

        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        expect(response).to.be.an('object');

        console.log(response);
        const { errors } = response
        expect(errors).to.be.an('array');
        expect(errors).to.have.length(1);

        const [ message_body ] =  errors;
        expect(message_body).to.be.an('object');

        const { message } = message_body
        expect(message).to.be.an('string');
        expect(message).to.equal('title is required');


        //
        // const { PostListing } = data;
        // expect(PostListing).to.be.an('array');
        // expect(PostListing).to.have.lengthOf(2);
        //
        // PostListing.forEach((post) => {
        //     expect(post).to.have.property('title').that.is.a('string');
        //     expect(post).to.have.property('content').that.is.a('string');
        //     expect(post).to.have.property('status').that.is.a('string');
        // })
    });

    it('should return a Error of "content is required" while updated a post', async () => {

        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});

        const post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short preview content"
        });
        const Mutation =
            `mutation Mutation($inputData: UpdatePostInput) {
                UpdatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            id: post._id,
            status: "DRAFT",
            title: "Example title"
        }

        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        console.log(response);
        expect(response).to.be.an('object');
        const { errors } = response
        expect(errors).to.be.an('array');
        expect(errors).to.have.length(1);

        const [ message_body ] =  errors;
        expect(message_body).to.be.an('object');

        const { message } = message_body
        expect(message).to.be.an('string');
        expect(message).to.equal('content is required');


        //
        // const { PostListing } = data;
        // expect(PostListing).to.be.an('array');
        // expect(PostListing).to.have.lengthOf(2);
        //
        // PostListing.forEach((post) => {
        //     expect(post).to.have.property('title').that.is.a('string');
        //     expect(post).to.have.property('content').that.is.a('string');
        //     expect(post).to.have.property('status').that.is.a('string');
        // })
    });

    it('should return a successful updated post', async () => {

        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});

        const post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });
        const Mutation =
            `mutation Mutation($inputData: UpdatePostInput) {
                UpdatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;

        const inputData = {
            id: post._id,
            status: "DRAFT",
            title: "Example title",
            content: 'Example content',
        }

        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        expect(response).to.be.an('object');

        const { errors, data } = response
        expect(errors).to.equal(undefined);
        // expect(errors).to.have.length(0);

        expect(data).to.be.an('object');
        const { UpdatePost  } = data
        expect(UpdatePost).to.be.an('object');

        expect(UpdatePost.id).to.equal(post.id);
        expect(UpdatePost.status).to.equal(inputData.status);
        expect(UpdatePost.content).to.equal(inputData.content);


    });
});
