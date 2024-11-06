import Joi from "joi";

class AuthValidationSchema {
  static register() {
    return Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": `"Ugh, your name should be text! *pouts*"`,
        "string.empty": `"Come on, the "name" can't be empty! *sigh*!"`,
        "string.min": `"Hmm, the "name" needs to be at least {#limit} characters long! *whines*`,
        "any.required": `"Hey, "name" is super important! You need to provide it! *pouts*`,
      }),
      email: Joi.string().email().required().messages({
        "string.email": `"Ugh, that doesn't look like a valid email! *sigh*!"`,
        "string.empty": `"Don't leave the "email" empty! *pouts*!"`,
        "any.required": `"You have to give me your "email"! *pouts dramatically*!"`,
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": `"Please, don't leave the "password" empty! *pouts*!"`,
        "string.min": `"Your "password" needs to be at least {#limit} characters long! *sigh*!"`,
        "any.required": `"Oh no! The "password" is a must! *dramatic gasp*!"`,
      }),
      roleId: Joi.string().required().messages({
        "string.empty": `"You can't leave the "roleId" empty! *pouts*!"`,
        "any.required": `"Ugh, I need a "roleId"! It's super important! *whines*!"`,
      }),
    });
  }

  static login() {
    return Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": `"That email seems off... Fix it! *pouts*!"`,
        "string.empty": `"Please fill in the "email"! Don't leave it empty! *sigh*!"`,
        "any.required": `"Hey, "email" is a must-have! *pouts dramatically*!"`,
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": `"Ugh, please provide a "password"! *sigh*!"`,
        "string.min": `"Your "password" needs to be at least {#limit} characters long! *whines*!"`,
        "any.required": `"Don't forget your "password"! It's super important! *dramatic gasp*!"`,
      }),
    });
  }

  static testing() {
    return Joi.object({
      test: Joi.string().required().messages({
        "string.empty": `"You need to provide a test! Don't leave it empty! *pouts*!"`,
        "any.required": `"Hey! Test is a required field! *whines*!"`,
      }),
      test1: Joi.string().required().messages({
        "string.empty": `"Test1 can't be empty! *pouts*!"`,
        "any.required": `"You need to provide test1! It's important! *dramatic gasp*!"`,
      }),
    });
  }
}

export default AuthValidationSchema;
