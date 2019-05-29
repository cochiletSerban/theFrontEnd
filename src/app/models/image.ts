import { User } from './user';
import { Rating } from './rating';
export interface Image {
    fileName?: string;
    owner?: User;
    picture: string;
    updatedAt?: Date;
    _id?: string;
    title?: string;
    description?: string;
    rating?: Rating;
}
