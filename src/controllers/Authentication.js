import AuthServices from "../services/AuthServices.js";
import { sendErrorResponse, sendResponse } from "../../utils/response.js";
import AuthValidationSchema from "../validators/AuthValidator.js";
import { lucia } from "../../utils/lucia.js";

class AuthController {
  async testing(req, res) {
    const { error } = AuthValidationSchema.testing().validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return sendErrorResponse(
        res,
        400,
        false,
        "Ugh, validation failed! Please check your input.",
        error.details.map((err) => err.message)
      );
    }

    try {
      const data = await AuthServices.test();
      sendResponse(res, 200, true, "Yay! Request was successful! ✨", data);
    } catch (e) {
      sendErrorResponse(
        res,
        error.statusCode || 500,
        false,
        "Something went wrong... *sigh*",
        e.message || "An unknown error occurred."
      );
    }
  }

  async register(req, res) {
    try {
      const result = await AuthServices.register(req.body);

      res.setHeader(
        "Set-Cookie",
        lucia.createSessionCookie(result.sessionId).serialize()
      );

      return sendResponse(
        res,
        200,
        true,
        "Hooray! You’ve successfully registered! 💖",
        this.#formatUserResponse(result.user)
      );
    } catch (error) {
      console.error("Registration error:", error);
      return sendErrorResponse(
        res,
        error.statusCode || 500,
        false,
        "Ugh, registration failed! *pouts*",
        error.message || "An unknown error occurred."
      );
    }
  }

  async login(req, res) {
    try {
      const { user, sessionId } = await AuthServices.login(req.body);

      res.setHeader(
        "Set-Cookie",
        lucia.createSessionCookie(sessionId).serialize()
      );

      return sendResponse(
        res,
        200,
        true,
        "Welcome back! You logged in successfully! 🌸",
        this.#formatUserResponse(user)
      );
    } catch (error) {
      console.error("Login error:", error);
      return sendErrorResponse(
        res,
        error.statusCode || 500,
        false,
        "Ugh, login failed! *sigh*",
        error.message || "An error occurred."
      );
    }
  }

  async user(req, res) {
    try {
      const user = req.user;
      if (user) {
        return sendResponse(
          res,
          200,
          true,
          "Yay! your data completetly and successfully retrieved! ヾ(＠＾▽＾＠)ﾉ",
          this.#formatUserResponse(user)
        );
      }
    } catch (error) {
      console.error("Session validation error:", error);
      return sendErrorResponse(
        res,
        500,
        false,
        "Where are you? User not found... *pouts*"
      );
    }
  }

  async logout(req, res) {
    const sessionId = req.cookies[lucia.sessionCookieName];

    try {
      await lucia.invalidateSession(sessionId);
      const sessionCookie = lucia.createBlankSessionCookie();
      res.setHeader("Set-Cookie", sessionCookie.serialize());

      return sendResponse(res, 200, true, "Bye-bye! You’ve logged out! 💔");
    } catch (error) {
      return sendErrorResponse(res, 500, false, "Ugh, logout failed! *sigh*");
    }
  }

  #formatUserResponse(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    };
  }
}

export default new AuthController();
