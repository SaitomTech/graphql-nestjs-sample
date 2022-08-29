import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WinstonModule } from 'nest-winston';
import { ImpressionModule } from './components/impressions/impressions.module';
import { PostsModule } from './components/posts/posts.module';
import { PrismaModule } from './components/prisma/prisma.module';
import { ProfileModule } from './components/profile/profile.module';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from './config/environments/pb-env.service';

@Module({
  imports: [
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PostsModule,
    ProfileModule,
    ImpressionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
