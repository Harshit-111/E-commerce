import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    //secure: "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 3600 * 1000,
  });
  return token;
};
export { generateToken };
