import { User } from './user';

export interface Comment {
    owner: User;
    text: string;
    createdAt: Date;
}
