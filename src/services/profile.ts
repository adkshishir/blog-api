import { profileType } from '../types';
import prisma from './prisma';

class profile {
  async createProfile(data: profileType) {
    let socialMedia = undefined;
    if (data.socialMedia) {
      socialMedia = {
        createMany: {
          data: data.socialMedia,
        },
      };
    }
    const profile = await prisma.owner.create({
      data: {
        userId: Number(data.userId),
        phone1: Number(data.phone1),
        phone2: Number(data.phone2),
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        salesEmail: data.salesEmail,
        infoEmail: data.infoEmail,
        supportEmail: data.supportEmail,
        zipCode: data.zipCode,
        website: data.website,
        socialMedia,
      },
    });

    return profile;
  }

  async updateProfile(data: profileType) {
    //   delete the social media of the users
    let socialMedia = undefined;
    if (data.socialMedia) {
      socialMedia = {
        createMany: {
          data: data.socialMedia,
        },
      };
    }
    await prisma.socialMedia.deleteMany({
      where: {
        ownerId: Number(data.userId),
      },
    });
    const profile = await prisma.owner.update({
      where: {
        userId: Number(data.userId),
      },
      data: {
        phone1: Number(data.phone1),
        phone2: Number(data.phone2),
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        salesEmail: data.salesEmail,
        infoEmail: data.infoEmail,
        supportEmail: data.supportEmail,
        zipCode: data.zipCode,
        website: data.website,
        socialMedia,
      },
    });
    return profile;
  }

  async getProfile(id: number) {
    const profile = await prisma.owner.findUnique({
      where: {
        userId: Number(id),
      },
    });
    return profile;
  }

  async deleteProfile(id: number) {
    const profile = await prisma.owner.delete({
      where: {
        userId: Number(id),
      },
    });
    return profile;
  }
  // add progress
  async addProgress(data: any) {
    const progress = await prisma.progress.create({
      data: {
        name: data.name,
        rating: Number(data.rating),
        title: data.title,
        description: data.description,
        avatar: {
          create: {
            url: process.env.BASE_URL + '/uploads/' + data.avatar?.url,
            alt: data.avatar?.alt,
          },
        },
      },
    });
    return progress;
  }
  // get latest 6 progress
  async getLatestProgress() {
    const progress = await prisma.progress.findMany({
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return progress;
  }
}

export default new profile();
