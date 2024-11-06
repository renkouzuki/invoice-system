import Joi from 'joi';

class InvoiceValidationSchema {
  static actiosInvoice() {
    return Joi.object({
      customerId: Joi.string().required().messages({
        "string.base": `"Ugh, "customerId" should be some text! *whines*!"`,
        "string.empty": `"Oh no! You can't leave the "customerId" empty! *pouts dramatically*!"`,
        "any.required": `"Please provide a "customerId"! It's super important! *whines*!"`,
      }),

      date: Joi.date().required().messages({
        "date.base": `"Oops, "date" needs to be a valid date! *sigh*!"`,
        "any.required": `"Please don't forget the "date"! We need to know when it happened! *whines*!"`,
      }),

      subTotal: Joi.number().positive().required().messages({
        "number.base": `"Oh no! "subTotal" should be a number! *pouts*!"`,
        "number.positive": `"Hmm, "subTotal" needs to be a positive number! *sigh*!"`,
        "any.required": `"You absolutely need to provide the "subTotal"! *whines*!"`,
      }),

      deposit: Joi.number().positive().required().messages({
        "number.base": `"Oops! "deposit" should be a number! *whines*!"`,
        "number.positive": `"Please, "deposit" should be a positive number! *pouts*!"`,
        "any.required": `"Oh no! The "deposit" is important! Don't forget it! *whines*!"`,
      }),

      deliveryFee: Joi.number().positive().required().messages({
        "number.base": `"Hmm, "deliveryFee" should be a number! *sigh*!"`,
        "number.positive": `"The "deliveryFee" must be a positive number! *pouts*!"`,
        "any.required": `"You need to provide the "deliveryFee"! It's essential! *whines*!"`,
      }),

      finalPayment: Joi.number().positive().required().messages({
        "number.base": `"Oops! "finalPayment" should be a number! *whines*!"`,
        "number.positive": `"The "finalPayment" must be a positive number! *pouts*!"`,
        "any.required": `"Oh no! You absolutely need to provide the "finalPayment"! *whines*!"`,
      }),

      bankName: Joi.string().min(3).required().messages({
        "string.base": `"Ugh, "bankName" should be some text! *pouts dramatically*!"`,
        "string.empty": `"Don't leave the "bankName" empty! You need to provide it! *whines*!"`,
        "string.min": `"Hmm, "bankName" needs to be at least {#limit} characters long! *sigh*!"`,
        "any.required": `"Oh no! I need a "bankName"! It's super important! *pouts*!"`,
      }),

      accountName: Joi.string().min(3).required().messages({
        "string.base": `"Oops! "accountName" should be some text! *whines*!"`,
        "string.empty": `"You can't leave the "accountName" empty! *pouts dramatically*!"`,
        "string.min": `"The "accountName" needs to be at least {#limit} characters long! *sigh*!"`,
        "any.required": `"Ugh, "accountName" is required! Please provide it! *whines*!"`,
      }),

      accountNumber: Joi.string().pattern(/^[0-9]+$/).length(10).required().messages({
        "string.base": `"Hmm, "accountNumber" should be a number! *whines*!"`,
        "string.empty": `"You can't leave the "accountNumber" empty! *pouts dramatically*!"`,
        "string.pattern.base": `"The "accountNumber" should only contain numbers and be exactly 10 digits long! *pouts*!"`,
        "any.required": `"You need to provide the "accountNumber"! It's super important! *whines*!"`,
      }),

      items: Joi.array().items(Joi.object({
        name: Joi.string().required().messages({
          "string.base": `"Ugh, "item name" should be text! *whines*!"`,
          "string.empty": `"Don't leave the "item name" empty! *pouts dramatically*!"`,
          "any.required": `"You need to provide an "item name"! *sighs dramatically*!"`,
        }),
        quantity: Joi.number().positive().required().messages({
          "number.base": `"Oops! "quantity" should be a number! *whines*!"`,
          "number.positive": `"The "quantity" must be a positive number! *pouts*!"`,
          "any.required": `"You need to provide the "quantity"! *whines*!"`,
        }),
        price: Joi.number().positive().required().messages({
          "number.base": `"Oh no! "price" should be a number! *whines*!"`,
          "number.positive": `"The "price" needs to be a positive number! *pouts dramatically*!"`,
          "any.required": `"Please don't forget the "price"! It's important! *sigh*!"`,
        }),
      })).required().messages({
        "array.base": `"Oops! "items" should be an array of items! *whines*!"`,
        "any.required": `"You need to provide the "items"! Don't forget them! *sigh*!"`,
      }),
    });
  }
}

export default InvoiceValidationSchema;
