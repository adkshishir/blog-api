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
  async getCategoriesBySlug(slug: string) {
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          equals: slug,
        },
      },
      select: {
        tags: true,
        name: true,
        slug: true,
        id: true,
        image: true,
      },
    });
    return categories;
  }

  async createCategory(data: any) {
    const category = await prisma.category.create({
      data,
    });
    return category;
  }
  async updateCategory(id: number, data: any) {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    });
    return category;
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

export default new Category()