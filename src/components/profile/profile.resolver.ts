import { HttpService } from '@nestjs/axios';
import { Query, Resolver } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { ProfileModel } from './interfaces/profile.model';

@Resolver((of) => ProfileModel)
export class ProfileResolver {
  constructor(private microCmsApi: HttpService) {}

  @Query(() => ProfileModel, { name: 'profile', nullable: true })
  async getProfile() {
    const data = (await firstValueFrom(this.microCmsApi.get('profile'))).data;
    const data2 = data.contents[0];
    console.log(data2);
    return data2;
  }
}
