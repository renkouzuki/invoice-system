import { Router } from "express";
import getPrismaClient from "../../utils/prisma.js";
import CustomerController from "../controllers/Customer.js";

const FrontendRoute = Router();

const prisma = getPrismaClient();
////////////////customer////////////////
FrontendRoute.get('/customer/index' , CustomerController.getCustomers.bind(CustomerController))
FrontendRoute.get('/customer/:id' , CustomerController.getCustomerById.bind(CustomerController))
FrontendRoute.post('/customer' , CustomerController.createCustomer.bind(CustomerController))
FrontendRoute.put('/customer/:id' , CustomerController.updateCustomer.bind(CustomerController))
FrontendRoute.put('/customer/delete/:id' , CustomerController.deleteCustomer.bind(CustomerController))


FrontendRoute.get('/customer/test', async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;

        const offset = (page - 1) * limit;

        const totalCustomer = await prisma.customer.groupBy({
            by: ['name']
        })
        const totalCount = totalCustomer.length

        const data = await prisma.$queryRaw`
        SELECT 
            c.name,
            COUNT(i.id)::INTEGER AS invoiceCount
          FROM 
            "Customer" c
          INNER JOIN 
            "Invoice" i ON c.id = i."customerId"
          GROUP BY 
            c.name
          ORDER BY 
            c.name
          LIMIT ${limit} OFFSET ${offset};
        `
        return res.status(200).json({
            data,
            meta: {
                totalCount,
                perPage: limit,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "an unknown error occured" })
    }
});
////////////////////////////////////////



export default FrontendRoute