import { sendErrorResponse, sendResponse } from "../../utils/response.js";
import InvoiceServices from "../services/InvoiceServices.js";

class InvoiceController {
  async getInvoices(req, res) {
    try {
        const data = await InvoiceServices.getInvoice(req.query);
        return sendResponse(res , 200 , true , "Yay! there is a data :D " , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async getInvoiceById(req, res) {
    try {
        const data = await InvoiceServices.getInvoiceId(req.params.id);
        return sendResponse(res , 200 , true , "Yay! there is a data :D " , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async createInvoice(req, res) {
    try {
        const data = await InvoiceServices.createInvoice(req.body);
        return sendResponse(res , 201 , true , "Invoice created successfully" , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async updateInvoice(req, res) {
    try {
        const data = await InvoiceServices.updateInvoice(req.params.id , req.body);
        return sendResponse(res , 200 , true , "Invoice updated successfully" , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async deleteInvoice(req, res) {
    try {
        const data = await InvoiceServices.deleteInvoice(req.params.id);
        return sendResponse(res , 200 , true , "Invoice deleted successfully" , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async getTrashedInvoice(req, res) {
    try {
        const data = await InvoiceServices.getTrashedInvoice(req.query);
        return sendResponse(res , 200 , true , "Yay! there is a data :D " , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async restoreInvoice(req, res) {
    try {
        const data = await InvoiceServices.restoreInvoice(req.params.id);
        return sendResponse(res , 200 , true , "Invoice restored successfully" , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }

  async permanentlyDeleteInvoice(req, res) {
    try {
        const data = await InvoiceServices.forceDeleteInvoice(req.params.id);
        return sendResponse(res , 200 , true , "Invoice permanently deleted successfully" , data);
    } catch (e) {
      console.log(e);
      return sendErrorResponse(res, 500, false, "Internal server error");
    }
  }
}

export default new InvoiceController();
