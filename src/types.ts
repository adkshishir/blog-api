export type userType = {
  role?: string;
  name: string;
  email: string;
  password: string;
  rememberToken?: string;
  emailVerifiedAt?: Date;
};

export type categoryType = {
  name?: string;
  description?: string;
  slug?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  tags?: string[];
  id?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
};
export type tagType = {
  name?: string;
  description?: string;
  slug?: string;
  categoryId: number;
  image?: {
    url?: string;
    alt?: string;
  };
  id?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
};
export type profileType = {
  userId: number;
  phone1: number;
  phone2: number;
  address: string;
  city: string;
  state: string;
  country: string;
  salesEmail: string;
  infoEmail: string;
  supportEmail: string;
  zipCode: string;
  website: string;
  socialMedia: {
    url: string;
    alt: string;
  }[];
};
export type postType = {
  title: string;
  content: string;
  authorId: number;
  categoryId: number;
  tagId: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    canonical: string;
  };
  contents: {
    title: string;
    content: string;
    specialSection: {
      name: string;
      description: string;
      url: string;
      image: {
        url: string;
        alt: string;
      };
    };
  }[];
  alt: string;
  image: {
    url: string;
    alt: string;
  };
};
