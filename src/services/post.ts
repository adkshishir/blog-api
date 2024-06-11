import prisma from './prisma';

class Post {
  async getPostBySlug(slug: string) {
    const post = await prisma.post.findFirst({
      where: {
        slug: {
          equals: slug,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        tag: {
          select: {
            name: true,
            slug: true,
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        images: {
          select: {
            url: true,
            alt: true,
          },
        },
        contents: {
          select: {
            content: true,
            title: true,
            specialSection: {
              select: {
                name: true,
                description: true,
                url: true,
                image: {
                  select: {
                    url: true,
                    alt: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return post;
  }
  async getAllPosts() {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        title: true,
        slug: true,
        id: true,
        tag: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return posts;
  }
  async createPost(data: any) {
    let images = undefined;
    let contents = undefined;
    // let specialSection = undefined;
    let seo = undefined;

    if (data.seo) {
      seo = {
        create: data.seo,
      };
    }

    if (data.contents) {
      // console.log(data, 'data.contents');
      contents = {
        create: data.contents.map((content: any, index: number) => {
          let specialSection = undefined;
          if (content?.specialSection) {
            let image = undefined;
            if (content?.specialSection?.image) {
              image = {
                create: {
                  url:
                    process.env.BASE_URL +
                    '/uploads/' +
                    content?.specialSection?.image.url,
                  alt: content?.specialSection?.image.alt,
                },
              };
            }
            specialSection = {
              create: {
                name: content?.specialSection?.name || undefined,
                description: content?.specialSection?.description || undefined,
                url: content?.specialSection?.url || undefined,
                image,
              },
            };
          }
          return {
            content: content?.content,
            title: content?.title,
            specialSection: specialSection,
          };
        }),
      };
      console.log(contents, 'contents');
    }
    if (data.images) {
      images = {
        createMany: {
          ...data.images.map((image: any, index: number) => {
            return {
              url: process.env.BASE_URL + '/uploads/' + image.url,
              alt: image.alt,
            };
          }),
        },
      };
    }
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status,
        h1: data.h1,
        // userId: data.userId,
        user: {
          connect: {
            id: data.userId,
          },
        },
        tag: {
          connect: {
            id: Number(data.tagId),
          },
        },
        seo,
        images,
        contents: contents,
      },
    });
    return post;
  }
  async updatePost(id: number, data: any) {
    //  delete the previous contents in the post
    await prisma.content.deleteMany({
      where: {
        postId: Number(id),
      },
    });
    let images = undefined;
    let contents = undefined;
    // let specialSection = undefined;
    let seo = undefined;

    if (data.seo) {
      seo = {
        create: data.seo,
      };
    }

    if (data.contents) {
      contents = {
        create: data.contents.map(async (content: any, index: number) => {
          let specialSection = undefined;
          if (content?.specialSection) {
            let image = undefined;
            if (content?.specialSection?.image) {
              image = {
                create: {
                  url:
                    process.env.BASE_URL +
                    '/uploads/' +
                    content?.specialSection?.image.url,
                  alt: content?.specialSection?.image.alt,
                },
              };
            }
            specialSection = {
              create: {
                name: content?.specialSection?.name || undefined,
                description: content?.specialSection?.description || undefined,
                url: content?.specialSection?.url || undefined,
                image,
              },
            };
          }
          return {
            content: content?.content,
            title: content?.title,
            specialSection: specialSection,
          };
        }),
      };
    }
    if (data.images) {
      images = {
        createMany: {
          ...data.images.map((image: any, index: number) => {
            return {
              url: process.env.BASE_URL + '/uploads/' + image.url,
              alt: image.alt,
            };
          }),
        },
      };
    }
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        status: data.status,
        h1: data.h1,

        user: {
          connect: {
            id: data.userId,
          },
        },
        tag: {
          connect: {
            id: Number(data.tagId),
          },
        },
        seo,
        images,
        contents,
      },
      include: {
        seo: true,
        images: true,
        contents: true,
      },
    });
    return post;
  }
  async getPost(id: number) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
  async deletePost(id: number) {
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    return post;
  }
}

export default new Post();
