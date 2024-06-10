export interface posts{
    posts: post[],
    total: number,
    skip: number,
    limit: number
}

export interface post {
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: reactions,
    views: number,
    userId: number
}

interface reactions{
    likes: number,
    dislikes: number
}
