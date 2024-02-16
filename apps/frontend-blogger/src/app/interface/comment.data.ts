
export interface Comment {
    id?: string;
    date: Date;
    author: string;
    comment: string;
    postId?: string;
}

export const INITIAL_COMMENT_STATE: Array<Comment> | Array<any> = [];