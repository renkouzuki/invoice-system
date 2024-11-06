import CustomerRepository from "../repositories/CustomerRepository.js";

class CustomerService {

    async getCustomer(body) {
        const { take = 10, page = 1, search } = body
        const filter = {
            AND: [
                {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                    ]
                }
            ]
        }
        try {
            const [data, count] = await Promise.all([
                await CustomerRepository.findAll({ take, page, filter }),
                await CustomerRepository.getCount({ filter })
            ])

            return {
                data: data,
                meta: {
                    page,
                    totalPages: Math.ceil(count / take),
                    totalCount: count
                }
            }
        } catch (e) {
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async getCustomerById(id) {
        try {
            if (!id) {
                throw this.#createError(
                    "Invalid ID",
                    "ID is required"
                )
            }
            const data = await CustomerRepository.findCustomerById(id);
            return data
        } catch (e) {
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async createCustomer(body) {
        try {
            const data = await CustomerRepository.createCustomer(body);
            return data;
        } catch (e) {
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async updateCustomer(id, body) {
        try {
            const data = await CustomerRepository.updateCustomer(id, body)
            return data;
        } catch (e) {
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async deleteCustomerr(id) {
        try {
            const data = await CustomerRepository.deleteCustomer(id);
            return data;
        } catch (e) {
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async revDeleteCustomer(body) {
        try{
            const { take = 10 , page = 1 , filter } = body
            const [data , counts] = Promise.all([
                await CustomerRepository.retrieveTrashCustomer({take, page, filter}),
                await CustomerRepository.getCount({filter})
            ])

            return {
                data: data,
                meta: {
                    page,
                    totalPages: Math.ceil(counts / take),
                    totalCount: counts
                }
            }
        }catch(e){
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async restoreCustomer(id) {
        try{
            const data = await CustomerRepository.restoreCustomer(id);
            return data;
        }catch(e){
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    async forceDeleteCustomer(e) {
        try{
            
        }catch(e){
            throw this.#createError(
                e.message,
                "Ugh, " + e.message
            )
        }
    }

    #createError(statusCode, message) {
        return {
            statusCode,
            message,
        };
    }
}

export default new CustomerService();