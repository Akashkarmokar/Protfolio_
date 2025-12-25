// import { PublicMutationClient, PublicQueryClient } from '../utils/client.js'
// import * as chai from 'chai'
// import { UpdateBio } from '../../graphql/api/bio/bio.service.js'
// import { initDBConnection } from '../../graphql/core/db.js'
// const expect = chai.expect

// describe('GraphQL API at /graphql path', () => {
//
//     beforeEach(() => {
//       // Mock AWS Lambda event for /graphql path
//
//     });
//
//     it('should return a valid response from the GraphQL API', async () => {
//       const bio_data = await UpdateBio({ data: 'xx' })
//       const Query = `
//           query BioDetails {
//             BioDetails {
//               name
//             }
//           }
//         `
//       const result = await PublicMutationClient(Query, null);
//       const body = JSON.parse(result.body);
//       expect(result.statusCode).to.equal(200);
//       expect(body.data).to.have.property('BioDetails'); // Ensure 'hello' query works
//       expect(body.data.BioDetails).to.have.property('name'); // Ensure no errors are returned
//     });
//   });


  /**
   * describe('GraphQL API at /graphql path', () => {
    let event, context;
    beforeEach(() => {
        // Mock AWS Lambda event for /graphql path
        event = {
            path: '/graphql', 
            httpMethod: 'POST',
            body: JSON.stringify({
                query: `
                    query GetBioDetails($id: ID!) {
                        BioDetails(id: $id) {
                            name
                        }
                    }
                `,
                variables: {
                    id: "123" // Pass the ID as a variable
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        context = {
            callbackWaitsForEmptyEventLoop: false
        };
    });

    it('should return a valid response from the GraphQL API', async () => {
        const result = await LambdaFunctionHandler(event, context);
        const body = JSON.parse(result.body);
        expect(result.statusCode).to.equal(200);
        expect(body.data).to.have.property('BioDetails');
        expect(body.data.BioDetails).to.have.property('name');
    });
});
   */