import Joi from 'joi';

class CustomerValidationSchema {
  static actionsCustomer() {
    return Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": `"Oops! The "name" should be text! *whines*!"`,
        "string.empty": `"Oh no! You can't leave the "name" empty! *pouts dramatically*!"`,
        "string.min": `"Hmm, the "name" needs to be at least {#limit} characters long! *sigh*!"`,
        "any.required": `"Ugh! You absolutely need to provide a "name"! *whines*!"`,
      }),

      attention: Joi.string().min(5).required().messages({
        "string.base": `"Uh-oh! "attention" should be some text! *pouts*!"`,
        "string.empty": `"Don't leave the "attention" field empty! You need to fill it out! *whines*!"`,
        "string.min": `"The "attention" needs to be at least {#limit} characters long! *pouts*!"`,
        "any.required": `"Please, don't forget your "attention"! It's important! *whines*!"`,
      }),

      tel: Joi.string().pattern(/^[0-9]+$/).length(10).required().messages({
        "string.base": `"Oh no! "tel" should be just numbers! *whines*!"`,
        "string.empty": `"You can't leave the "tel" empty! We need your number! *pouts dramatically*!"`,
        "string.pattern.base": `"Hmm, "tel" should only have numbers and be exactly 10 digits long! *pouts*!"`,
        "any.required": `"You need to provide your "tel"! It's super important! *whines*!"`,
      }),
    });
  }
}

export default CustomerValidationSchema;
