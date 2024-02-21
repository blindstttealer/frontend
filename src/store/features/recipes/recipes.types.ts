export interface IRecipeContainer {
    count: number;
    next: string;
    previous: null;
    results: IRecipe[];
}

export interface IRecipe {
    id: number;
    title: string;
    slug: string;
    category: any[];
    short_text: string;
    preview_image: null;
    author: Author;
    pub_date: string;
    tag: any[];
    cooking_time: number;
    total_comments_count: number;
    total_views_count: number;
    total_reactions_count: number;
    reactions: any[];
    activity_count: number;
}

export interface Author {
    id: number;
    username: string;
    avatar: string;
}

export interface IRecipeInitialState {
    recipes: {
        feed: IRecipe,
        feedActivity: IRecipe,
        feedSubscriptions: IRecipe
    },
    isError: any,
    isLoading: boolean,
    flag: boolean,
}
