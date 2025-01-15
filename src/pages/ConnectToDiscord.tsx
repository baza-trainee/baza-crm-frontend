import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { connectBot } from '../utils/connectBotApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../types';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';

const ConnectToDiscord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const botToken = params.get('token');
    const userInfo: Auth['user'] = JSON.parse(localStorage.getItem('user')!);
    const token: Auth['token'] = JSON.parse(localStorage.getItem('token')!);
    const user = {
      token: token,
      user: userInfo,
    };
    dispatch(loginUser(user));
    const connect = async () => {
      try {
        await connectBot(user!.token, botToken as string);
        navigate('/crm/projects?status=success');
      } catch (err) {
        navigate('/crm/instruction?status=error');
      }
    };
    if (botToken) {
      connect();
    }
  }, []);
  return (
    <div className="min-h-screen bg-text-black overflow-hidden z-50">
      <Spinner />
    </div>
  );
};

export default ConnectToDiscord;
