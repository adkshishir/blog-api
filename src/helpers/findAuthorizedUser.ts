import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
function findAuthorizedUser(req: Request) {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { id: string; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}
export default findAuthorizedUser;
