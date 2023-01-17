export interface IPosts {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number
}

export interface IState{
    loading: boolean,
    post: IPosts[],
    errorMsg: string,
}


export enum Tags {
  history = 'History',
  american = 'American',
  crime = 'Crime',
  magical = 'Magical',
  fiction = 'Fiction'
}

