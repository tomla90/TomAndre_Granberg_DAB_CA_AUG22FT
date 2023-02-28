module.exports = {
    checkIfAuthorized: function(req, res, next) {
      if (req.user == null) {
        res.status(401).send(new Error());
        return;
      }
      console.log("User role:", req.user.role);
      if (req.user.role.toLowerCase() === "admin" || req.user.role.toLowerCase() === "member") {
        next();
      } else {
        res.status(403).send(new Error());
      }
    },
    isAdmin: function(req, res, next) {
      if (req.user.role.toLowerCase() === "admin") {
        next();
      } else {
        res.status(403).send(new Error());
      }
    }
  };