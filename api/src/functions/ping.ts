import { app, HttpResponseInit } from '@azure/functions';

app.http('ping', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'ping',
  handler: async (): Promise<HttpResponseInit> => {
    return {
      status: 200,
      jsonBody: {
        status: 'ok',
        service: 'pastor.activefaith.church',
        timestamp: new Date().toISOString(),
      },
    };
  },
});
