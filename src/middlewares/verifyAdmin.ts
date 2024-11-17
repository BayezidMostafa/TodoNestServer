import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message:
        "Oops! You just tripped over the security lasers🚨 This area is off-limits! Kindly backtrack to safety before the alarm bots arrive😉",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message:
        "Oops! You just tripped over the security lasers🚨 This area is off-limits! Kindly backtrack to safety before the alarm bots arrive😉",
    });
  }

  try {
    const secret = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    if ((decoded as any).role === "ADMIN") {
      next();
    } else {
      return res.status(401).json({
        message:
          "Oops! You are not authorized to perform this action! back off!😉",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      message: "Invalid token! Looks like your access pass expired🔒",
    });
  }
};
