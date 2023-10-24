import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connection from './database.js';
import { User } from '../models/userModel.js';
import { validPassword } from '../utils/passwordUtils.js';

const customFields = {
    usernameField: 'name',
    passwordField: 'password'
};

const verifyCallback = (name, password, done) => {

    User.findOne({ name: name })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
