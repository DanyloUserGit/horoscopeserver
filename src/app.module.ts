import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NatalModule } from './natal/natal.module';
import { UserModule } from './users/users.module';
import { UserInfoModule } from './usersInfo/userInfo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_LINK');
        const appEnv = configService.get('APP_ENV');
        
        return {
          uri,
          dbName: appEnv === 'DEV' ? 'Hrscp' :'Horoscope'
        };
      },
    }),
    NatalModule,
    UserModule,
    UserInfoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
