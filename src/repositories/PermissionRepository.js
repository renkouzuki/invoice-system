import BaseRepository from "./BaseRepository.js";

class PermissionRepository extends BaseRepository {
    constructor() {
        super()
    }

    async findAllPermissions(){
        return await this.prisma.permission.findMany();
    }

    async findPermissionByName(permissionName){
        return await this.prisma.permission.findUnique({
            where:{
                name:permissionName
            }
        })
    }
}

export default new PermissionRepository();