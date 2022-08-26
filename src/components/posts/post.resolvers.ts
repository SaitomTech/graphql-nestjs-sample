import { Int, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './interfaces/post.model';
import { ConfigService } from '@nestjs/config';
import { PbEnv } from 'src/config/environments/pb-env.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private configService: ConfigService,
    private pbEnv: PbEnv,
    private readonly prisma: PrismaService,
  ) {}

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

  @Query(() => String)
  helloConfiguration(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV'); // development （.env.development.localのもの）
    return nodeEnv;
    // const databaseUrl = this.configService.get<string>('DATABASE_URL'); // postgresql:/... （.env.development.localのもの）
    // const microCmsKey = this.configService.get<string>('MICRO_CMS_KEY'); // 1234567890（環境変数のもの）
  }

  @Query(() => Int)
  hello(): number {
    return this.pbEnv.Port;
  }

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }
}
