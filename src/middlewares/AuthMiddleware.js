import { lucia } from "../../utils/lucia.js";
import getPrismaClient from "../../utils/prisma.js";
import { sendErrorResponse } from "../../utils/response.js";

const prisma = getPrismaClient();
const authenticateUser = async (req, res, next) => {
  const sessionId = req.cookies[lucia.sessionCookieName];

  if (!sessionId) {
    return sendErrorResponse(res, 401, false, "Unauthorized");
  }

  try {
    const { session } = await lucia.validateSession(sessionId);
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        profile: true,
        role: {
          select: {
            name: true,
            permissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || user.deleted_at) {
      return sendErrorResponse(res, 401, false, "Unauthorized");
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      role: user.role.name,
      profile: user.profile,
      permissions: user.role.permissions.map((p) => p.permission.name),
    };
    next();
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, false, "An unknown error occurred");
  }
};

export default authenticateUser;
