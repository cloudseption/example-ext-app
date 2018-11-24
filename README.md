# Dummy External App

This app has just enough code to demonstrate how to log in with BadgeBook, as
well as how to verify tokens on the server. It's NodeJS-only, but the python
utilities for doing JOSE (JSON Object Signing and Encryption) are even easier
to use than those available in JS, so you shouldn't have a hard time.

### Getting Started
This is a quick-start for setting up BadgeBook authentication on your external application. I've commented all of the important files, and provided links to them below. Please shoot me a message if you have any questions.

- The client should load [`token-handler.js`](./src/public/js/token-handler.js)
before it needs to make any calls that should be authenticated with a badgebook access token.
- An example of some simple client-side interaction is available in [`index.html`](./src/public/index.html).
- You can find an example token validator in [`badgebook-token-handler.js`](./src/security/badgebook-token-handler.js).

### Getting Set Up for Your App
1) Get your public/secret key from the BadgeBook server (you can DM Patrick for instructions, and can do it entirely from Postman)

2) Set the following constants on the client side:

    - `CLIENT_PUBLIC_KEY`: Your client public key, taken from the BadgeBook server.
    - `BADGEBOOK_TOKEN_URL`: The `/token.html` endpoint on the BadgeBook server. This is where we send the user when you call the `loginWithBadgeBook` function.
    - `TOKEN_COOKIE_NAME`: (Optional - defaults to `authorization`) when the script receives a token from BadgeBook, it stores it in a cookie, which gets sent down to your server automatically. If you change this, change it in on the server, too.

3) Set the following constants on the server side (if you use the [`badgebook-token-handler.js`](./src/security/badgebook-token-handler.js) I've provided):

    - `BADGEBOOK_COOKIE_NAME`: The name of the cookie that the handler will look for the token in. Defaults to `authorization`. If you change this, change it client-side, as well.
    - `CLIENT_KEY`: Your client public key (from BadgeBook). Please don't hardcode this - pull it from environment variables, or store it in a DB and load it dynamically.
    - `CLIENT_SECRET`: Your client private key (from BadgeBook). Please don't hardcode this - pull it from environment variables, or store it in a DB and load it dynamically.

### Notes

- The token verifier that I set up is super basic. For proper handling, you should set up separate public/private routes, and return a 401 error for any that are private. At this point, you could send the user back to the login page.