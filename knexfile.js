'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DATABASE_URL
  },

  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL
  },

  production: {}
};
