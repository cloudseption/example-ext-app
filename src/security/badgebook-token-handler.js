const log = require('log4js').getLogger();
const jose = require('node-jose');

// This is the name of the cookie that should hold the token you're looking for.
const BADGEBOOK_COOKIE_NAME = 'authorization';
const CLIENT_KEY            = 'cVQ3s9KTT2hxv_Lz-nQ2zi19p4EFSGF2vTqTfDy3Teg';
const CLIENT_SECRET         = 'yg1vXGzYvzEbV3U8Kbdy_HkySrFQvnLLwlzi53r5VTA';

// Key JSON. Used by node-jose to make a key.
const KEY_JSON = {
    kty: "oct",
    kid: CLIENT_KEY,
    k:   CLIENT_SECRET
};

/**
 * Checks req for a badgebook token that's signed for your app and verifies it.
 * If it's valid, it sets req.isValidBadgeBookUser to true and appends all that
 * users details to req.badgeBookUserDetails
 */
async function badgeBookTokenHandler(req, res, next) {
    let token = req.cookies[BADGEBOOK_COOKIE_NAME];
    let tokenPayload;

    try {
        let key             = await jose.JWK.asKey(KEY_JSON);
        let verifier        = await jose.JWS.createVerify(key);
        let verifiedToken   = await verifier.verify(token);
        let payload         = JSON.parse(verifiedToken.payload.toString());

        if (payload) {
            tokenPayload = payload;
        }
    } catch (err) {
        // We had some sort of error. You could log it if you want.
    }

    // If token is valid, attach details to request. You can use these to
    // implement security or make decisions later on down your filtering chain.
    if (tokenPayload) {
        req.isValidBadgeBookUser = true;
        req.badgeBookUserDetails = tokenPayload;
    }
    next();
}

module.exports = badgeBookTokenHandler;