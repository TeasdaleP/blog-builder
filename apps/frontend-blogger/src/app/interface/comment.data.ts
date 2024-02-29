
export interface Comment {
    id?: string;
    date: Date;
    author: string;
    comment: string;
    blogId?: string;
}

export const INITIAL_COMMENT_STATE: Comment[] | any[] = [];