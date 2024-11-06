import getPrismaClient from "../../utils/prisma.js";

class BaseRepository {
    constructor(){
        if(this.constructor === BaseRepository){
            throw new TypeError("oops sowwy look like an abstract classes cant be instantiated. >w<");
        }
        this.prisma = getPrismaClient();
    }
}

export default BaseRepository;