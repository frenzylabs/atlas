import passport from "passport";

const middleware = passport.authenticate("bearer", {session: false});

export default middleware;