import { Client } from '../utils/client.js'
import * as chai from 'chai'
import { UpdateBio } from '../../graphql/api/bio/bio.service.js'
import { initDBConnection } from '../../graphql/core/db.js'
const expect = chai.expect

import { create_a_single_post, delete_post } from "../../graphql/api/post/post.repository.js";
import {query} from "express";

describe('Post Listing', () => {

    beforeEach(() => {
        // Mock AWS Lambda event for /graphql path

    });

    it('should return all active post', async () => {
        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});
        for(let i = 0; i < 2; i++) {
            await create_a_single_post({
                title: 'test' + (+i),
                content: 'content' + (+i),
                status: "ACTIVE",
                short_preview_content: "short_preview_content"
            });
        }
        const Mutation =
            `query Query($inputData: PostListingInput) {
              PostListing(inputData: $inputData) {
                metadata {
                   page
                   limit
                   total_count
                }
                posts {
                  title
                  status
                  content
                  id
                }
              }
            }`;
        const inputData = {
            status: "ACTIVE"
        }
        let response = await Client(Mutation, inputData);
        console.log("RESPONSE: ", response)
        expect(response.statusCode).to.equal(200);

        response = JSON.parse(response.body);
        expect(response).to.be.an('object');
        const { data } = response
        expect(data).to.be.an('object');

        const { PostListing } = data;
        expect(PostListing).to.be.an('object');

        const { posts, metadata } = PostListing;
        expect(posts).to.be.an('array');
        expect(posts).to.have.lengthOf(2);

        expect(metadata).to.be.an('object');
        expect(metadata).to.have.property('total_count').that.is.a('number');
        expect(metadata).to.have.property('page').that.is.a('number');
        expect(metadata).to.have.property('limit').that.is.a('number');
        expect(metadata.total_count).to.equal(2);
        expect(metadata.page).to.equal(1);
        expect(metadata.limit).to.equal(10);

        posts.forEach((post) => {
            expect(post).to.have.property('title').that.is.a('string');
            expect(post).to.have.property('content').that.is.a('string');
            expect(post).to.have.property('status').that.is.a('string');
            expect(post).to.have.property('id').that.is.a('string')
        })


    });

    it('should return all active post according pagination data', async () => {
        /**
         * Mock Database first
         */
        await delete_post({ query: {
                status: "ACTIVE"
            }});
        for(let i = 0; i < 2; i++) {
            await create_a_single_post({
                title: 'test' + (+i),
                content: 'content' + (+i),
                status: "ACTIVE",
                short_preview_content: "short_preview_content"
            });
        }
        const Mutation =
            `query Query($inputData: PostListingInput) {
              PostListing(inputData: $inputData) {
                metadata {
                   page
                   limit
                   total_count
                }
                posts {
                  title
                  status
                  content
                  id
                }
              }
            }`;
        const inputData = {
            status: "ACTIVE",
            page: 1,
            limit: 1
        }
        let response = await Client(Mutation, inputData);
        console.log("RESPONSE: ", response)
        expect(response.statusCode).to.equal(200);

        response = JSON.parse(response.body);
        expect(response).to.be.an('object');
        const { data } = response
        expect(data).to.be.an('object');

        const { PostListing } = data;
        expect(PostListing).to.be.an('object');

        const { posts, metadata } = PostListing;
        expect(posts).to.be.an('array');
        expect(posts).to.have.lengthOf(1);

        expect(metadata).to.be.an('object');
        expect(metadata).to.have.property('total_count').that.is.a('number');
        expect(metadata).to.have.property('page').that.is.a('number');
        expect(metadata).to.have.property('limit').that.is.a('number');
        expect(metadata.total_count).to.equal(2);
        expect(metadata.page).to.equal(1);
        expect(metadata.limit).to.equal(1);

        posts.forEach((post) => {
            expect(post).to.have.property('title').that.is.a('string');
            expect(post).to.have.property('content').that.is.a('string');
            expect(post).to.have.property('status').that.is.a('string');
            expect(post).to.have.property('id').that.is.a('string')
        })

    });
});

describe('Single Post', () => {

    beforeEach(() => {
        // Mock AWS Lambda event for /graphql path

    });

    it('should return error of "id is required"', async () => {
        /**
         * Mock Database first
         */
        await delete_post({ query: {}});
        const created_post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });

        const Mutation =
            `query Query($inputData: PostInput) {
              Post(inputData: $inputData) {
                id
                title
                status
                content
              }
            }`;
        const inputData = {
            // id: created_post.id
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

    });

    it('should return error of "post not found"', async () => {
        /**
         * Mock Database first
         */
        await delete_post({ query: {}});
        const created_post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });

        const Mutation =
            `query Query($inputData: PostInput) {
              Post(inputData: $inputData) {
                id
                title
                status
                content
              }
            }`;
        const wrong_id = created_post.id + "x";
        const inputData = {
            id: wrong_id
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
        expect(message).to.equal('post not found');

    });

    it('should return a single post', async () => {
        /**
         * Mock Database first
         */
        await delete_post({ query: {}});
        const created_post = await create_a_single_post({
            title: 'test',
            content: 'content',
            status: "ACTIVE",
            short_preview_content: "short_preview_content"
        });

        const Mutation =
            `query Query($inputData: PostInput) {
              Post(inputData: $inputData) {
                id
                title
                status
                content
              }
            }`;
        const inputData = {
            id: created_post.id
        }
        let response = await Client(Mutation, inputData);
        expect(response.statusCode).to.equal(200);

        response = JSON.parse(response.body);
        expect(response).to.be.an('object');
        const { data } = response
        expect(data).to.be.an('object');

        const { Post } = data;
        expect(Post).to.be.an('object');

        const { id, title, content, status } = Post;
        expect(id).to.be.an('string');
        expect(id).to.have.lengthOf(17)
        expect(title).to.equal(created_post.title);
        expect(content).to.equal(created_post.content);
        expect(status).to.equal(created_post.status);

    });
});

