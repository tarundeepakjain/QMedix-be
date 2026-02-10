import { supabase } from "../utils/supabase.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = data.user;
  next();
};

