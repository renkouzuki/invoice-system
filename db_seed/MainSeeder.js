import getPrismaClient from "../utils/prisma.js";
import CustomerSeeder from "./seeders/CustomerSeeder.js";
import PermissionSeeder from "./seeders/PermissionSeeder.js";
import RoleSeeder from "./seeders/RoleSeeder.js";

class MainSeeder {
    
    constructor(){
        this.prisma = getPrismaClient();
    }

    async run(){
        const seeders = [
            new RoleSeeder(),
            new PermissionSeeder(),
            new CustomerSeeder()
        ];

        for(const seeder of seeders){
            await seeder.run();
        }

        console.log("All seeding completed!")
    }

    async disconnect(){
        await this.prisma.$disconnect();
    }
}

async function main(){
    const mainSeeder = new MainSeeder();

    try{
        await mainSeeder.run();
    }catch(e){
        console.log(e)
        process.exit(1);
    }finally{
        await mainSeeder.disconnect();
    }
}

main();