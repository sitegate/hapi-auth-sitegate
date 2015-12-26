'use strict';

module.exports = function(opts) {
  opts = opts || {};

  if (!opts.origin) throw new Error('opts.origin is required');

  return {
    protocol: 'oauth2',
    auth: opts.origin + '/oauth2/authorize',
    token: opts.origin + '/oauth2/token',
    profile: function(credentials, params, get, callback) {
      get(opts.origin + '/api/userinfo', {}, function(profile) {
        credentials.profile = profile;
        return callback();
      });
    }
  };
};
