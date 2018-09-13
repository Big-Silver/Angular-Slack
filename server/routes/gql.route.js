import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from '../gql-schema';

const router = express.Router();

router.post('/graphql', graphqlExpress({ schema }));

router.use('/playground', graphiqlExpress({ endpointURL: '/graphql' }));

export default router;
