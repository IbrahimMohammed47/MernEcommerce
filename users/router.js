const express = require('express');
const { checkJwt } = require('../middleware');
const router = express.Router();
const authMngtClient = require('./authMngtClient.js')

router.patch('/',checkJwt, async (req, res) => {
  try {
    const userId = req.auth.sub
    const attrs =  {};
    const name = req.body.name
    if(name && typeof(name)=='string' && name.length>0){
      attrs.name = name;
    }
    const updated = await authMngtClient.updateUser(
      {id: userId},
      attrs
    )
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
