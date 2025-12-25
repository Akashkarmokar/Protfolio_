import { Client  } from '../utils/client.js'
import * as chai from 'chai'
const expect = chai.expect

describe('Create A Post', () => {

    beforeEach(() => {
        // Mock AWS Lambda event for /graphql path

    });

    it('should return error of "status is required"', async () => {
        const Mutation =
            `mutation Mutation($inputData: CreatePostInput) {
                CreatePost(inputData: $inputData) {
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            title: 'Test Post',
            content: 'Test Content',
            // status: "ACTIVE"

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
        expect(message).to.equal('status is required');




    });
    it('should return error of "title is required"', async () => {
        const Mutation =
            `mutation Mutation($inputData: CreatePostInput) {
                CreatePost(inputData: $inputData) {
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            content: 'Test Post',
            status: "ACTIVE"
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
        expect(message).to.equal('title is required');
    });
    it('should return error of "content is required"', async () => {
        const Mutation =
            `mutation Mutation($inputData: CreatePostInput) {
                CreatePost(inputData: $inputData) {
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            title: 'Test Title',
            status: "ACTIVE"
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
        expect(message).to.equal('content is required');
    });

    it('should return error of "short preview content required"', async () => {
        const Mutation =
            `mutation Mutation($inputData: CreatePostInput) {
                CreatePost(inputData: $inputData) {
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            title: 'Test Post',
            content: 'Test Post',
            status: 'ACTIVE'
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
        expect(message).to.equal('short preview content required');
    });

    it('should return a successful post', async () => {
        const Mutation =
            `mutation Mutation($inputData: CreatePostInput) {
                CreatePost(inputData: $inputData) {
                    id
                    content
                    status
                    title
                }
            }`;
        const inputData = {
            title: 'Test Post',
            content: 'Test Post +',
            status: 'ACTIVE',
            short_preview_content: "short_preview_content"
            // tags: ['Test Tags'],
        }
        let response = await Client(Mutation, inputData);

        expect(response.statusCode).to.equal(200);


        response = JSON.parse(response.body);
        expect(response).to.be.an('object');
        console.log("RES: ", response)
        const { errors, data } = response
        expect(errors).to.equal(undefined);

        const { CreatePost } =  data;
        expect(CreatePost).to.be.an('object');
        const { title, content, status, id } = CreatePost

        expect(id).to.be.an('string');
        expect(id).to.have.lengthOf(17)
        expect(title).to.be.equal(inputData.title);
        expect(content).to.equal(inputData.content);
        expect(status).to.equal(inputData.status);
    });
});
