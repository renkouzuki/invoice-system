import HandlingValidations from "../../utils/handlingValidations.js";
import InvoiceRepository from "../repositories/InvoiceRepository.js";
import InvoiceValidationSchema from "../validators/InvoiceValidator.js";

class InvoiceService extends HandlingValidations{
  async getInvoice(body) {
    const { take = 10, page = 1, search, startDate, endDate } = body;
    const filter = {
      AND: [
        {
          OR: [
            { customer: { name: { contains: search, mode: "insensitive" } } },
            { invoiceNumber: { contains: search, mode: "insensitive" } },
          ],
        },
        startDate && endDate
          ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
          : {},
      ],
    };
    try {
      const [data, count] = await Promise.all([
        await InvoiceRepository.findAll({ take, page, filter }),
        await InvoiceRepository.getCount({ filter }),
      ]);
      return {
        data,
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

  async getInvoiceId(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await InvoiceRepository.findInvoiceById(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async createInvoice(body) {
    
    const { error } = InvoiceValidationSchema.actiosInvoice().validate(body, {
      abortEarly: false,
    })

    this.handleValidation(error);

    try {
      const data = await InvoiceRepository.createInvoice(body);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async updateInvoice(id, body) {

    const { error } = InvoiceValidationSchema.actiosInvoice().validate(body, {
        abortEarly: false,
    })
  
    this.handleValidation(error);

    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await InvoiceRepository.updateInvoice(id, body);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async deleteInvoice(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await InvoiceRepository.deleteInvoice(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async revDeleteInvoice(body) {
    const { take = 10, page = 1, search, startDate, endDate } = body;
    const filter = {
      AND: [
        {
          OR: [
            { customer: { name: { contains: search, mode: "insensitive" } } },
            { invoiceNumber: { contains: search, mode: "insensitive" } },
          ],
        },
        startDate && endDate
          ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
          : {},
      ],
    };
    try {
      const [data, count] = await Promise.all([
        await InvoiceRepository.retrieveTrashInvoice({ take, page, filter }),
        await InvoiceRepository.getCount({ filter }),
      ]);

      return {
        data,
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

  async restoreInvoice(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await InvoiceRepository.restoreInvoice(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }

  async forceDeleteInvoice(id) {
    try {
      if (!id) {
        throw new Error("Ugh i need Id! I REALLY MEANT IT! hmp >///<");
      }
      const data = await InvoiceRepository.forceDeleteInvoice(id);
      return data;
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }
}

export default new InvoiceService();
