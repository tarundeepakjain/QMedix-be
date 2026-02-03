export const authenticate = (req, res, next) => {
  console.log("SESSION:", req.session);
  console.log("COOKIES:", req.headers.cookie);
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = req.session.user;
  next();
};
