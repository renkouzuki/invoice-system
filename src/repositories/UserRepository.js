import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  async findUserById(userId) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUserRole(userId, roleId) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { roleId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new UserRepository();
