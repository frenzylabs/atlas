import passport from "passport";

const middleware = passport.authenticate(["basic", "bearer"], {session: false});

export default middleware;