import BaseRepository from "./BaseRepository.js";

class RoleRepository extends BaseRepository {
  constructor() {
    super();
  }

  async findRoleById(roleId) {
    return await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async deleteRolePermissions(roleId) {
    return await this.prisma.rolePermission.deleteMany({
      where: { roleId },
    });
  }

  async addPermissionsToRole(roleId, permissionIds) {
    const rolePermissions = permissionIds.map((permissionId) => ({
      roleId,
      permissionId,
    }));
    return this.prisma.rolePermission.createMany({
      data: rolePermissions,
    });
  }
}

export default new RoleRepository();
