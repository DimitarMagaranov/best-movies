function authAdmin() {
    return function (req, res, next) {
        const user = req.user;
        console.log(user);
        const role = user.roles[0];
        if (role === "admin") {
            next();
            return;
        }
        
        res.status(403).send({ message: "Require Admin Role!" });
        return;
    }
}

module.exports = authAdmin;