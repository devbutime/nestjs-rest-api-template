import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserServiceInterface } from "./user.interface";

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(private prisma: PrismaService) {}

    async users(): Promise<User[]> {
        return this.prisma.user.findMany({
            include: {
                ads: true,
            },
        });
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                ads: true,
            },
        });
    }

    async updateUser(id: string, updateUserData: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id: id },
            include: {
                ads: true,
            },
            data: updateUserData as Prisma.UserUpdateInput,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<void> {
        await this.prisma.user.delete({
            where,
            include: {
                ads: true,
            },
        });
    }
}
