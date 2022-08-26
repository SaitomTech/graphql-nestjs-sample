import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import { PbEnvModule } from './config/environments/pb-env.module';
import { PbEnv } from './config/environments/pb-env.service';

@Module({
  imports: [
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
