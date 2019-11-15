export interface IUser {
    name?: string;
    birth?: Date;
    category?: 0 | 1 | 2;
    email?: string;
    phone?: string;
    firebase_uid?: string;
    installed?: boolean;
    loginMethods?: ILoginMethod[];
}

interface ILoginMethod {
    id: string;
    provider: 'Phone' | 'Email' | 'Google' | 'Facebook';
}