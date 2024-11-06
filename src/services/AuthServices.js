import AuthRepository from "../repositories/AuthRepository.js";
import AuthValidationSchema from "../validators/AuthValidator.js";

class AuthServices {
  async test() {
    return await AuthRepository.test();
  }

  async register(body) {
    const { error } = AuthValidationSchema.register().validate(body, {
      abortEarly: false,
    });

    if (error) {
      throw this.#createError(
        400,
        error.details.map((err) => ({
          [err.context.key] : err.message
        }))
      );
    }

    try {
      return await AuthRepository.RegisterUser(body);
    } catch (e) {
      this.#handleRegistrationError(e);
    }
  }

  async login(body) {
    const { email, password } = body;

    const { error } = AuthValidationSchema.login().validate(body, {
      abortEarly: false,
    });

    if (error) {
      throw this.#createError(
        400,
        error.details.map((err) => err.message).join(", ")
      );
    }

    try {
      return await AuthRepository.LoginUser(email, password);
    } catch (e) {
      throw this.#createError(
        e.message === "User not exist!" ? 404 : 400,
        "Ugh, " + e.message
      );
    }
  }

  #createError(statusCode, message) {
    return {
      statusCode,
      message,
    };
  }

  #handleRegistrationError(error) {
    if (error.message === "Invalid role") {
      throw {
        statusCode: 400,
        message: "Ugh, that role doesn’t exist! *pouts*",
      };
    } else if (error.code === "P2002") {
      throw {
        statusCode: 400,
        message:
          "Oh no! A user with that email already exists! *dramatic gasp*",
      };
    } else {
      throw {
        statusCode: 500,
        message: "Something went wrong... *sigh* Please try again later!",
      };
    }
  }
}

export default new AuthServices();
