import BaseRepository from "./BaseRepository.js";

class InvoiceRepository extends BaseRepository {
  constructor() {
    super();
  }

  async findAll({ take, page, filter }) {
    return await this.prisma.invoice.findMany({
      where: filter,
      take,
      skip: (page - 1) * take,
      select: {
        id: true,
        invoiceNumber: true,
        date: true,
        subTotal: true,
        deposit: true,
        deliveryFee: true,
        finalPayment: true,
        customer: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getCount({ filter }) {
    return await this.prisma.invoice.count({
      where: filter,
    });
  }

  async createInvoice(body) {
    const {
      customerId,
      date,
      subTotal,
      deposit,
      deliveryFee,
      finalPayment,
      bankName,
      accountName,
      accountNumber,
      items,
    } = body;

    let lastInvoiceNumber = await this.prisma.lastInvoiceNumber.findUnique({
      where: { id: 1 },
    });

    if (!lastInvoiceNumber) {
      lastInvoiceNumber = await this.prisma.lastInvoiceNumber.create({
        data: {
          id: 1,
          value: 880,
        },
      });
    }

    const newInvoiceNumber = lastInvoiceNumber.value + 1;

    await this.prisma.lastInvoiceNumber.update({
      where: {
        id: 1,
        value: newInvoiceNumber,
      },
    });

    const invoiceNumber = `#${newInvoiceNumber.toString().padStart(6, "0")}`;

    const data = await this.prisma.invoice.create({
      data: {
        customerId,
        invoiceNumber,
        date: new Date(date),
        subTotal,
        deposit,
        deliveryFee,
        finalPayment,
        bankName,
        accountName,
        accountNumber,
        items: {
          create: items.map((item) => ({
            description: item.description,
            unit: item.unit,
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
          })),
        },
      },
      include: { items: true },
    });

    return data;
  }

  async updateInvoice(id, body) {
    const {
      customerId,
      invoiceNumber,
      date,
      subTotal,
      deposit,
      deliveryFee,
      finalPayment,
      bankName,
      accountName,
      accountNumber,
      items,
    } = body;

    const data = await this.prisma.invoice.update({
      where: { id },
      data: {
        customerId,
        invoiceNumber,
        date: new Date(date),
        subTotal,
        deposit,
        deliveryFee,
        finalPayment,
        bankName,
        accountName,
        accountNumber,
        items: {
          deleteMany: {},
          create: items.map((item) => ({
            description: item.description,
            unit: item.unit,
            quantity: item.quantity,
            price: item.price,
            amount: item.amount,
          })),
        },
      },
      include: { items: true },
    });
    return data;
  }

  async deleteInvoice(id) {
    const data = await this.prisma.invoice.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return data;
  }

  async restoreInvoice(id) {
    const data = await this.prisma.invoice.update({
      where: {
        id,
      },
      data: {
        deleted_at: null,
      },
    });
    return data;
  }

  async forceDeleteInvoice(id) {
    const data = await this.prisma.invoice.delete({
      where: {
        id,
      },
    });
    return data;
  }

  async retrieveTrashInvoice({ take, page, filter }) {
    return await this.prisma.invoice.findMany({
      where: filter,
      take,
      skip: (page - 1) * take,
      select: {
        id: true,
        invoiceNumber: true,
        date: true,
        subTotal: true,
        deposit: true,
        deliveryFee: true,
        finalPayment: true,
        customer: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findInvoiceById(id) {
    return await this.prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
        customer: true,
      },
    });
  }
}

export default new InvoiceRepository();
