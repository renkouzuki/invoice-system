import HandlingValidations from "../../utils/handlingValidations.js";
import CustomerRepository from "../repositories/CustomerRepository.js";
import CustomerValidationSchema from "../validators/CustomerValidator.js";

class CustomerService extends HandlingValidations{
  async getCustomer(body) {
    const { take = 10, page = 1, search, startDate, endDate } = body;
    const filter = {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { attention: { contains: search, mode: "insensitive" } },
            { tel: { contains: search, mode: "insensitive" } },
          ],
        },
        startDate && endDate
          ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
          : {},
      ],
    };
    try {
      const [data, count] = await Promise.all([
        await CustomerRepository.findAll({ take, page, filter }),
        await CustomerRepository.getCount({ filter }),
      ]);

      return {
        data: data,
        meta: {
          page,
          totalPages: Math.ceil(count / take),
          totalCount: count,
        },
      };
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async getCustomerById(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await CustomerRepository.findCustomerById(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async createCustomer(body) {
    const { error } = CustomerValidationSchema.actionsCustomer().validate(body,{
        abortEarly: false,
    });

    this.handleValidation(error);

    try {
      const data = await CustomerRepository.createCustomer(body);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async updateCustomer(id, body) {

    const { error } = CustomerValidationSchema.actionsCustomer().validate(body,{
        abortEarly: false,
    });

    this.handleValidation(error);

    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await CustomerRepository.updateCustomer(id, body);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async deleteCustomerr(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await CustomerRepository.deleteCustomer(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async revDeleteCustomer(body) {
    try {
      const { take = 10, page = 1, search, startDate, endDate } = body;
      const filter = {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { attention: { contains: search, mode: "insensitive" } },
              { tel: { contains: search, mode: "insensitive" } },
            ],
          },
          startDate && endDate
            ? {
                createdAt: { gte: new Date(startDate), lte: new Date(endDate) },
              }
            : {},
        ],
      };
      const [data, counts] = Promise.all([
        await CustomerRepository.retrieveTrashCustomer({ take, page, filter }),
        await CustomerRepository.getCount({ filter }),
      ]);

      return {
        data: data,
        meta: {
          page,
          totalPages: Math.ceil(counts / take),
          totalCount: counts,
        },
      };
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async restoreCustomer(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await CustomerRepository.restoreCustomer(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async forceDeleteCustomer(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await CustomerRepository.forceDeleteCustomer(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async listDropDownCustomer(body){
    try{
        const data = await CustomerRepository.listsCustomer(body);
        return data;
    }catch(e){
        throw new Error("Ugh, " + e.message);
    }
  }
}

export default new CustomerService();
