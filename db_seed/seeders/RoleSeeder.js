import BaseSeeder from "../BaseSeeder.js";

class RoleSeeder extends BaseSeeder {
    async run(){
        const roles = await this.prisma.role.createMany({
            data:[
                {name:"super_admin"},
                {name:"admin"},
                {name:"user"}
            ],
            skipDuplicates:true
        });

        console.log("Roles created:",roles);
    }
}

export default RoleSeeder;