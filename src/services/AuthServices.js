import HandlingValidations from "../../utils/handlingValidations.js";
import AuthRepository from "../repositories/AuthRepository.js";
import AuthValidationSchema from "../validators/AuthValidator.js";

class AuthServices extends HandlingValidations {
  async test() {
    return await AuthRepository.test();
  }

  async register(body) {
    const { error } = AuthValidationSchema.register().validate(body, {
      abortEarly: false,
    });

    this.handleValidation(error);

    try {
      return await AuthRepository.RegisterUser(body);
    } catch (e) {
      this.handleRegistrationError(e);
    }
  }

  async login(body) {
    const { email, password } = body;

    const { error } = AuthValidationSchema.login().validate(body, {
      abortEarly: false,
    });

    this.handleValidation(error);

    try {
      return await AuthRepository.LoginUser(email, password);
    } catch (e) {
      throw new Error("Ugh, " + e.message);
    }
  }
}

export default new AuthServices();
