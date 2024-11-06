import { lucia } from "../../utils/lucia.js";
import bcrypt from "bcryptjs";
import BaseRepository from "./BaseRepository.js";

class AuthRepository extends BaseRepository{

  constructor(){
    super()
  }

  async test() {
    return { test: "test" };
  }

  async RegisterUser(data) {
    const { name, email, password, roleId } = data;

    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new Error("Role not found!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId,
      },
    });

    const session = await lucia.createSession(user.id, {});
    return {
      user,
      sessionId: session.id,
    };
  }

  async LoginUser(email, password) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not exist!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password!");
    }

    const session = await lucia.createSession(user.id, {});
    return {
      user,
      sessionId: session.id,
    };
  }
}

export default new AuthRepository();
