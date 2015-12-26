'use strict';

const Hapi = require('hapi');
const sitegateProvider = require('../');
let server = new Hapi.Server();
server.connection({ port: '5000' });

server.register([require('bell')], function(err) {
  if (err) throw err;

  server.auth.strategy('sitegate', 'bell', {
    provider: sitegateProvider({
      origin: 'http://localhost:3000',
    }),
    password: 'password',
    isSecure: false,
    clientId: '<YOUR_SITEGATE_ID>',
    clientSecret: '<YOUR_SITEGATE_SECRET>',
  });

  // Your login route and callback route
  server.route({
    method: 'GET',
    path: '/auth/sitegate',
    config: {
      auth: 'sitegate',
      handler: function(request, reply) {
        reply(request.auth.credentials.profile);
      }
    }
  });

  server.start(function() {});
});
