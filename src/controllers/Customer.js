import { sendErrorResponse, sendResponse } from "../../utils/response.js";
import CustomerServices from "../services/CustomerServices.js";

class CustomerController {
    async getCustomers(req , res) {
        try{
            const data = await CustomerServices.getCustomer(req.query);
            return sendResponse(res , 200 , true , "Yay! there is a data :D " , data);
        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async getCustomerById(req , res) {
        const {id} = req.params
        try{
            const data = await CustomerServices.getCustomerById(id);
            return sendResponse(res , 200 , true , "Yay! there is a data :D " , data);
        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async createCustomer(req, res){
        try{
            const data = await CustomerServices.createCustomer(req.body);
            return sendResponse(res , 201 , true , "Customer created successfully" , data);    
        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async updateCustomer(req , res){
        const {id} = req.params;
        try{
            const data = await CustomerServices.updateCustomer(id , req.body);
            return sendResponse(res , 200 , true , "Customer updated successfully" , data)
        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async deleteCustomer(req , res){
        const {id} = req.params;
        try{
            const data = await CustomerServices.deleteCustomerr(id)
            return sendResponse(res , 200 , true , "Customer deleted successfully" , data)
        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async getTrashedCustomer(req ,res){
        try{

        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async restoreCustomer(req , res){
        try{

        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }

    async permanentlyDeleteCustomer(req , res){
        try{

        }catch(e){
            console.log(e);
            return sendErrorResponse(res , 500 , false , "Internal server error")
        }
    }
}

export default new CustomerController();