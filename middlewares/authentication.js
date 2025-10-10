const{ createTokenForUser,validateToken} = require("../services/authentication");


function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    // For a user who isn't logged in...
    if (!tokenCookieValue) {
      return next(); // This is correct. It calls next() and stops.
    }

    // This part of the code is only reached if a token exists.
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      // It's also good practice to not have an empty catch block
      console.error('Invalid token:', error.message);
    }

    return next();
  };
}

module.exports = {
    checkForAuthenticationCookie,

};