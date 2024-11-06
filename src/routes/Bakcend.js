import { Router } from "express";
import getPrismaClient from "../../utils/prisma.js";
import CustomerController from "../controllers/Customer.js";
import InvoiceController from "../controllers/Invoice.js";

const BackendRoute = Router();

// const prisma = getPrismaClient();
////////////////customer////////////////
BackendRoute.get('/customer/index' , CustomerController.getCustomers.bind(CustomerController))
BackendRoute.get('/customer/trash' , CustomerController.getTrashedCustomer.bind(CustomerController))
BackendRoute.get('/customer/dropdown' , CustomerController.getDropDownCustomer.bind(CustomerController))
BackendRoute.get('/customer/:id' , CustomerController.getCustomerById.bind(CustomerController))
BackendRoute.post('/customer' , CustomerController.createCustomer.bind(CustomerController))
BackendRoute.put('/customer/:id' , CustomerController.updateCustomer.bind(CustomerController))
BackendRoute.put('/customer/delete/:id' , CustomerController.deleteCustomer.bind(CustomerController))
BackendRoute.put('/customer/restore/:id' , CustomerController.restoreCustomer.bind(CustomerController))
BackendRoute.delete('/customer/force-delete/:id' , CustomerController.permanentlyDeleteCustomer.bind(CustomerController))


BackendRoute.get('/invoice/index' , InvoiceController.getInvoices.bind(InvoiceController));
BackendRoute.get('/invoice/trash' , InvoiceController.getTrashedInvoice.bind(InvoiceController));
BackendRoute.get('/invoice/:id' , InvoiceController.getInvoiceById.bind(InvoiceController));
BackendRoute.post('/invoice' , InvoiceController.createInvoice.bind(InvoiceController));
BackendRoute.put('/invoice/:id' , InvoiceController.updateInvoice.bind(InvoiceController));
BackendRoute.put('/invoice/delete/:id' , InvoiceController.deleteInvoice.bind(InvoiceController));
BackendRoute.put('/invoice/restore/:id' , InvoiceController.restoreInvoice.bind(InvoiceController));
BackendRoute.delete('/invoice/force-delete/:id' , InvoiceController.permanentlyDeleteInvoice.bind(InvoiceController));





// FrontendRoute.get('/customer/test', async (req, res) => {
//     try {
//         const { limit = 5, page = 1 } = req.query;

//         const offset = (page - 1) * limit;

//         const totalCustomer = await prisma.customer.groupBy({
//             by: ['name']
//         })
//         const totalCount = totalCustomer.length

//         const data = await prisma.$queryRaw`
//         SELECT 
//             c.name,
//             COUNT(i.id)::INTEGER AS invoiceCount
//           FROM 
//             "Customer" c
//           INNER JOIN 
//             "Invoice" i ON c.id = i."customerId"
//           GROUP BY 
//             c.name
//           ORDER BY 
//             c.name
//           LIMIT ${limit} OFFSET ${offset};
//         `
//         return res.status(200).json({
//             data,
//             meta: {
//                 totalCount,
//                 perPage: limit,
//                 currentPage: page,
//                 totalPages: Math.ceil(totalCount / limit),
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ msg: "an unknown error occured" })
//     }
// });
////////////////////////////////////////



export default BackendRoute