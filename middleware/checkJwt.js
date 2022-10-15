const {expressjwt:jwt} = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkJwt = (req, res, next)=>{ 
    return (jwt({
        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
      
        // Validate the audience and the issuer
        audience: process.env.AUTH0_AUDIENCE, //replace with your API's audience, available at Dashboard > APIs
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: [ 'RS256' ]
    }))(req,res,next);
}



module.exports = checkJwt;
