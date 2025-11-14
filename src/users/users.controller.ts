import { Controller ,Get,Query,Post,Put,Delete,Param,Body,Headers } from '@nestjs/common';


let users = [
   { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
   { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
   { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
   { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
 ]; 
 
@Controller('users')
export class UsersController {
// ---------------------------------------------------
// 1. Récupérer tous les utilisateurs + filtrage query
// URL : GET /users
// URL filtrée : GET /users?username=Mouhamed
// ---------------------------------------------------
  @Get()
  findAll(@Query('username') username: string) {
    if (username) {
      return users.filter(user => user.username === username);
    }
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return users.find((user) => user.id === Number(id));
  }

  @Post()
  create(@Headers('authorization') auth: string, @Body() data){
   console.log('Token envoyé par le client : ', auth);
   const newUser ={
     id: Date.now(),
     ...data,
   }
   users.push(newUser);
   return users;
  }

 @Put(':id')
 update(@Param('id') id: number, @Body() data){
  const foundUser = users.find((u) => u.id === Number(id));
  if(foundUser){
    foundUser.username = data.username;
    foundUser.email = data.email;
    foundUser.status = data.status;
    return foundUser;
  }
  return "notfound";
 }

  @Delete(':id')
  remove(@Param('id') id: number){
    const index = users.findIndex((u) => u.id === Number(id));
    if(index !== -1){
      users.splice(index, 1);
      return { message: 'User deleted successfully' };
    }
    return { message: 'User not found' };
  }

}
