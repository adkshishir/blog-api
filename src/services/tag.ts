import prisma from './prisma';

class Tag {
  async getAllTags() {
    try {
      const tags = await prisma.tag.findMany();
      return tags;
    } catch (error) {
      throw error;
    }
  }
  async getTag(id: number) {
    try {
      const tag = await prisma.tag.findUnique({
        where: {
          id,
        },
      });

      if (!tag) {
        throw {
          status: 404,
          message: 'Tag not found',
        };
      }
      return tag;
    } catch (error) {
      throw error;
    }
  }
  async getTagsBySlug(slug: string) {
    try {
      const tag = await prisma.tag.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
        },
        select: {
          name: true,
          slug: true,
          id: true,
          image: {
            select: {
              url: true,
              alt: true,
            },
          },
          seo: {
            select: {
              metaTitle: true,
              metaDescription: true,
              metaKeywords: true,
              canonical: true,
              // ogTitle: true,
              // ogDescription: true,
              // twitterTitle: true,
              // twitterDescription: true,
              // twitterImage: true,
            },
          },
        },
      });

      if (!tag) {
        throw {
          status: 404,
          message: 'Tag not found',
        };
      }
      return tag;
    } catch (error) {
      throw error;
    }
  }

  async createTag(data: any) {
    try {
      const imageUrl = process.env.BASE_URL + '/uploads/' + data.image?.url;
      let image: any = undefined;
      if (data?.image) {
        image = {
          create: {
            url: imageUrl,
            alt: data.image.alt,
          },
        };
      }
      const tag = await prisma.tag.create({
        data: {
          name: data.name,
          slug: data.slug,
          categoryId: Number(data.categoryId),
          description: data.description,
          image: image,
          seo: {
            create: data.seo,
          },
        },
      });
      return tag;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'Tag already exists',
        };
      }
      throw { error };
    }
  }
  async updateTag(id: number, data: any) {
    try {
      const imageUrl = process.env.BASE_URL + '/uploads/' + data.image?.url;
      let image: any = undefined;
      if (data?.image) {
        image = {
          create: {
            url: imageUrl,
            alt: data.image.alt,
          },
        };
      }
      const tag = await prisma.tag.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          slug: data.slug,
          categoryId: Number(data.categoryId),
          description: data.description,
          image: image,
          seo: {
            update: data.seo,
          },
        },
      });
      return tag;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'Tag already exists',
        };
      }
      throw { error };
    }
  }

  async deleteTag(id: number) {
    try {
      const tag = await prisma.tag.delete({
        where: {
          id,
        },
      });
      return tag;
    } catch (error) {
      throw error;
    }
  }
}
export default new Tag();
