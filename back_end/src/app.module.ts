import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Enternal Modules
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { CategoryModule } from './category/category.module';
import { UserService } from './user/user.service';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'root', 
      database: 'todo_list',
      autoLoadEntities:true,
      synchronize: true,
  }), UserModule, TodoModule, CategoryModule],
  controllers: [AppController, UserController ],
  providers: [UserService,AppService],
})
export class AppModule {}