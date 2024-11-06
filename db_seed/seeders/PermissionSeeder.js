import BaseSeeder from "../BaseSeeder.js";

class PermissionSeeder extends BaseSeeder {
  async run() {
    const permissions = await this.prisma.permissions.createMany({
      data: [
        "create_items",
        "view_items",
        "edit_items",
        "update_items",
        "delete_items",
        "create_roles",
        "view_roles",
        "edit_roles",
        "update_roles",
        "delete_roles",
      ].map((name) => ({ name })),
      skipDuplicates: true,
    });

    console.log("Permissions created:", permissions);
  }
}

export default PermissionSeeder;