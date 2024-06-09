
export type userType = {
    role?: string;
    name: string;
    email: string;
    password: string;
    rememberToken?: string;
    emailVerifiedAt?: Date;
}

export type categoryType = {
    name?: string;
    description?: string;
    slug?: string;
    image?: {
        url?: string
        alt?: string
    }
    tags?: string[]
    id?: number
    seo?: {
       metaTitle?: string
       metaDescription?: string
        metaKeywords?: string
        canonical?: string
       ogTitle?: string
       ogDescription?: string
       ogImage?: string
       twitterTitle?: string
       twitterDescription?: string
       twitterImage?: string
    }

}