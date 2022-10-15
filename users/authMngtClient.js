require('dotenv').config()

const ManagementClient = require('auth0').ManagementClient;
const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId:process.env.AUTH0_MNGR_CLIENT_ID,
  clientSecret:process.env.AUTH0_MNGR_CLIENT_SECRET,
  scope: 'read:users update:users',
});

module.exports = auth0