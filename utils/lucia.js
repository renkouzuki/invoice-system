import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import getPrismaClient from "./prisma.js";
import { Lucia } from "lucia";

const client = getPrismaClient();
const adapter = new PrismaAdapter(client.session , client.user);

export const lucia = new Lucia(adapter, {
    sessionCookie:{
        attributes:{
            secure: process.env.NODE_ENV === "production"
        }
    },

    getUserAttributes: (attribute) =>{
        return {
            name: attribute.name,
            email: attribute.email,
            roleId: attribute.roleId,
            profile: attribute.profile
        }
    }
});