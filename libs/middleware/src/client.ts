import passport from "passport";

const middleware = passport.authenticate("client-basic", {session: false});

export default middleware;