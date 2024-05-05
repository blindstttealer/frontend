export enum Reactions {
  'Like',
  'Dislike',
  'Angry_Face',
  'Heart',
  'Fire',
}

export type ReactionType = keyof typeof Reactions

export interface GetRecipeReactionsResult {
  reactions: Partial<Record<ReactionType, number>>
  user_reactions: {
    type: ReactionType
    id: number
  }[]
}
