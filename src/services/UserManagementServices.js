import HandlingValidations from "../../utils/handlingValidations.js";
import PermissionRepository from "../repositories/PermissionRepository.js";
import RoleRepository from "../repositories/RoleRepository.js";
import UserRepository from "../repositories/UserRepository.js";

class UserManagementServices extends HandlingValidations {
  async updateRolePermissions(roleId, permissions) {
    try {
      const role = await RoleRepository.findRoleById(roleId);
      if (!role) {
        throw new Error("Role not found");
      }

      const allPermissions = await PermissionRepository.findAllPermissions();
      const validPemrissionNames = allPermissions.map((p) => p.name);

      const invalidPermissions = permissions.filter(
        (p) => !validPemrissionNames.includes(p)
      );

      if (invalidPermissions.length > 0) {
        throw new Error("Invalid permissions");
      }

      await RoleRepository.deleteRolePermissions(roleId);

      const permissionIds = await Promise.all(
        permissions.map((permissionName) => {
          const permission = allPermissions.find(
            (p) => p.name === permissionName
          );
          return permission.id;
        })
      );

      await RoleRepository.addPermissionsToRole(roleId, permissionIds);

      return RoleRepository.findRoleById(roleId);
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async updateUserRole(userId, roleId) {
    try {
      const [user, role] = await Promise.all([
        await UserRepository.findUserById(userId),
        await RoleRepository.findRoleById(roleId),
      ]);

      if (!user) {
        throw new Error("User not found");
      }

      if (!role) {
        throw new Error("Role not found");
      }

      const updatedUser = await UserRepository.updateUserRole(userId, roleId);

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profile: updatedUser.profile,
        role: updatedUser.role.name,
        permissions: updatedUser.role.permissions.map(
          (rp) => rp.permission.name
        ),
      };
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }
}

export default new UserManagementServices();
