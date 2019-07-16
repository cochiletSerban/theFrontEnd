import { User } from './user';
import { Rating } from './rating';
import { Comment } from './comment';
export interface Image {
    fileName?: string;
    owner?: User;
    picture: string;
    createdAt?: Date;
    _id?: string;
    title?: string;
    description?: string;
    rating?: Rating;
    comms?: number;
    tags?: string[];
    numberOfComments?: Comment[];
}
