import { UserService } from './user.service';
import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, } from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        try {
            const user = await this.userService.createUser(createUserDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Usuario agregado con éxito',
                user
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e.console.errors.name.message });
        }
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users)
    }

    @Get('/:userID')
    async getUserById(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });
        if (!user) throw new NotFoundException('El usuario no existe');
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:userID')
    async deleteUser(@Res() res, @Param('userID') userID) {
        const userDeleted = await this.userService.deleteUser(userID);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });
        if (!userDeleted) throw new NotFoundException('El usuario no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario eliminado con éxito',
            userDeleted
        });
    }
    
    @Put('/:userID')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Param('userID') userID) {
        const userUpdated = await this.userService.updateUser(userID, createUserDTO);
        if (userID.length !== 24)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'El usuario no existe' });
        if (!userUpdated) throw new NotFoundException('El usuario no exites');
        return res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado con éxito',
            userUpdated
        });
    }
}
