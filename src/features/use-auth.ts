import {useSelector} from 'react-redux';

interface UserState {
    email: string;
    token: string;
    id: string;
}

interface RootState {
    user: UserState;
}


export function useAuth() {
    const { email, token } = useSelector((state: RootState) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
    };
}