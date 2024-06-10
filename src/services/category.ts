import { categoryType } from '../types';
import prisma from './prisma';

class Category {
  async getCategories() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async getCategory(id: number) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        tags: true,
        name: true,
        slug: true,
        id: true,
        image: true,
      },
    });
    return category;
  }
  async getCategoryBySlug(slug: string) {
    const categories = await prisma.category.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        tags: {
          select: {
            name: true,
            slug: true,
            id: true,
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
          },
        },
        name: true,
        slug: true,
        id: true,

        image: {
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });
    return categories;
  }

  async createCategory(data: categoryType) {
    //   create url from image name
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

      const category = await prisma.category.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          image: image,
          seo: {
            create: data.seo,
          },
        },
      });
      return category;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'Category already exists',
        };
      }
      throw error;
    }
  }
  async updateCategory(id: number, data: categoryType) {
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
      const category = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          image: image,
          seo: {
            update: data.seo,
          },
        },
      });
      return category;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'Category already exists',
        };
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  }
}

export default new Category();
