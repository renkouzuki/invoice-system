import BaseRepository from "./BaseRepository.js";

class CustomerRepository extends BaseRepository {

    constructor() {
        super();
    }

    async findAll({take , page , filter}){
        return await this.prisma.customer.findMany({
            where:filter,
            take,
            skip:(page - 1) * take,
            select:{
                id:true,
                name:true,
                attention:true,
                tel:true
            }
        })
    }

    async getCount({filter}){
        return await this.prisma.customer.count({
            where: filter
        })
    }

    async createCustomer(body) {
        const { name, attention, tel } = body;
        const data = await this.prisma.customer.create({
            data: {
                name,
                attention,
                tel
            }
        })
        return data
    }

    async updateCustomer(id, body) {
        const { name, attention, tel } = body;
        const data = await this.prisma.customer.update({
            where: {
                id
            },
            data: {
                name,
                attention,
                tel
            }
        })
        return data
    }

    async deleteCustomer(id) {
        await this.prisma.customer.update({
            where: {
                id
            },
            data: {
                deleted_at: new Date()
            }
        })
        return true
    }

    async restoreCustomer(id) {
        await this.prisma.customer.update({
            where: {
                id
            },
            data: {
                deleted_at: null
            }
        })
        return true
    }

    async forceDeleteCustomer(id) {
        await this.prisma.customer.delete({
            where: {
                id
            }
        })
        return true
    }

    async retrieveTrashCustomer({take , page,  filter}) {
        return await this.prisma.customer.findMany({
            where: filter,
            skip: (page - 1) * take,
            take,
            select: {
                id: true,
                name: true,
                attention: true,
                tel: true,
                deleted_at: true
            },
            orderBy: {
                deleted_at: 'desc'
            }
        })
    }

    async findCustomerById(id){
        return await this.prisma.customer.findUnique({
            where: {
                id,
                deleted_at: null
            }
        })
    }

    async listsCustomer(body){
        const { search } = body;
        const items = await this.prisma.customer.findMany({
            select:{
                id:true,
                name:true
            },
            where:{
                name:{contains: search , mode: 'insensitive'}
            },
            take:5
        });

        const data = items.map(item => ({
            id: item.id,
            value: item.name,
            label: `${item.name.charAt(0).toUpperCase() + item.name.slice()}`
        }))

        return data;
    }
}

export default new CustomerRepository();