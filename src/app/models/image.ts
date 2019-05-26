import { User } from './user';

export interface Image {
    fileName?: string;
    owner?: User;
    picture: string;
    updatedAt?: Date;
    _id?: string;
    title?: string;
    description?: string;
}
