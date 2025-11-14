import { Controller ,Get,Post,Put,Delete,Param,Body,Query,Headers } from '@nestjs/common';

@Controller('users')
export class UsersController {
 users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ]; 
  
  // ---------------------------------------------------
  // 1. Récupérer tous les utilisateurs + filtrage query
  // URL : GET /users
  // URL filtrée : GET /users?status=active
  // ---------------------------------------------------
  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) {
      return this.users.filter((user) => user.status === status);
    }
    return this.users;
  }

  // ---------------------------------------------------
  // 2. Récupérer un utilisateur par ID
  // URL : GET /users/3
  // ---------------------------------------------------
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.users.find((user) => user.id == id);
  }

  // ---------------------------------------------------
  // 3. Ajouter un nouvel utilisateur
  // URL : POST /users
  // Body : { "username": "...", "email": "...", "status": "..." }
  // Header : Authorization: token-secret
  // ---------------------------------------------------
  @Post()
  createUser(
    @Body() userData: any,
    @Headers('authorization') token: string,
  ) {
    console.log('TOKEN envoyé par le client : ', token);

    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };

    this.users.push(newUser);
    return newUser;
  }
    // ---------------------------------------------------
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: any) {
    const user = this.users.find((u) => u.id == id);

    if (!user) return { message: 'Utilisateur introuvable' };

    Object.assign(user, data); // Mise à jour propre

    return user;
  }

  // ---------------------------------------------------
  // 5. Supprimer un utilisateur
  // URL : DELETE /users/3
  // ---------------------------------------------------
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    const before = this.users.length;
    this.users = this.users.filter((u) => u.id != id);
    const after = this.users.length;

    return before !== after
      ? { message: 'Utilisateur supprimé' }
      : { message: 'Utilisateur introuvable' };
  }

  // ---------------------------------------------------
  // 6. Route spéciale : afficher les users actifs
  // URL : GET /users/active/active
  // ---------------------------------------------------
  @Get('active/:status')
  getUsersByStatus(@Param('status') status: string) {
    return this.users.filter((u) => u.status === status);
  }
}
