import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './components/posts/posts.module';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(
        process.cwd(),
        'src/generated/graphql/schema.gql',
      ),
      sortSchema: true,
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
