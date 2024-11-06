import UserManagementServices from "../services/UserManagementServices.js";

class UserMangementController {
  async updateRolePermissions(req, res) {
    const { roleId, permissions } = req.body;

    if (!roleId || !Array.isArray(permissions)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const updatedRole = await UserManagementServices.updateRolePermissions(
        roleId,
        permissions
      );

      const formattedRole = {
        id: updatedRole.id,
        name: updatedRole.name,
        permissions: updatedRole.permissions.map((rp) => rp.permission.name),
      };

      return res.status(200).json({ role: formattedRole });
    } catch (error) {
      console.error("Error updating role permissions:", error);
      if (error.message.includes("Invalid permission names")) {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Unable to update role permissions" });
      }
    }
  }

  static async updateUserRole(req, res) {
    const userId = req.query.id;
    const { roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({ msg: "User ID and Role ID are required" });
    }

    try {
      const formattedUser = await UserService.updateUserRole(userId, roleId);

      return res.status(200).json({
        msg: "User role updated successfully",
        user: formattedUser,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      if (
        error.message === "User not found" ||
        error.message === "Role not found"
      ) {
        return res.status(404).json({ msg: error.message });
      }

      return res.status(500).json({ msg: "Internal server error" });
    }
  }
}

export default new UserMangementController();
