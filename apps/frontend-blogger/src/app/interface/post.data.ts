export interface Post {
    id?: string;
    title: string;
    date?: Date;
    author: string;
    description: string;
    images?: string[];
    tags?: string[];
    comments?: string[];
}

export const MOCK_POST: Post = {
    title: 'the title for the full test data object',
    date: new Date(),
    author: 'the author for the full test data object',
    description: 'the description for the full test data object',
    tags: [],
    images: [],
    comments: []
}

export const INITIAL_POST_STATE: Post[] = [];