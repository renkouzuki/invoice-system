import { faker } from "@faker-js/faker";
import BaseSeeder from "../BaseSeeder.js";

class CustomerSeeder extends BaseSeeder {
    async run(){
        const customers = [];

        for(let i = 0; i < 2; i++){
            const customer = await this.prisma.customer.create({
                data:{
                    name:faker.person.fullName(),
                    attention:faker.name.jobTitle(),
                    tel:faker.phone.number()
                }
            });
            customers.push(customer);
        }

        console.log("Customer created:" , customers);
    }
}

export default CustomerSeeder;