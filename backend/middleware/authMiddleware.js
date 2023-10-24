export function isAuth (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

export function isAdmin (req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

// Middleware to check for ownership of user id
export function isOwner (req, res, next) {
    if (req.isAuthenticated() && (req.user.id == req.params.id || req.user.id == req.body.userId)) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not the Owner.' });
    }
}