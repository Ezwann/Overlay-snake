# Overlay Snake

A simple snake made to be used in interraction with a twitch tchat (or anything else).
Turn based.

To be used with a Twitch tchat, you will need a bot or something else, in order to detect moving instructions.
The moving instructions have to be send to the node server at "http://HOST:PORT/update" in a POST request.
The keys used in the route are "req.body.direction" and "req.body.repeat"