import { Int, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { ConfigService } from '@nestjs/config';
import { PbEnv } from 'src/config/environments/pb-env.service';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private configService: ConfigService, private pbEnv: PbEnv) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }

  @Query(() => Int)
  hello(): string {
    return this.pbEnv.DatabaseUrl;
  }
}
