class HandlingValidations {
  handleValidation(error) {
    if (error) {
      const errorMessages = error.details
        .map((err) => `${err.context.key} : ${err.message}`)
        .join(",");
      throw new Error(errorMessages);
    }
  }

  handleRegistrationError(error) {
    if (error.message === "Invalid role") {
      throw new Error("Ugh, that role doesn’t exist! *pouts*");
    } else if (error.code === "P2002") {
      throw new Error(
        "Oh no! A user with that email already exists! *dramatic gasp*"
      );
    } else {
      throw new Error("Something went wrong... *sigh* Please try again later!");
    }
  }
}

export default HandlingValidations;
