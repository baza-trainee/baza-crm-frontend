import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../types';
import { loginUser } from '../features/userSlice';
import { connectDiscordProject } from '../utils/connectBotApi';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const ConnectToDiscordProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    const projectId = params.get('state');
    const guildId = params.get('guild_id');
    const user: Auth = JSON.parse(localStorage.getItem('user')!);
    dispatch(loginUser(user));

    const connect = async () => {
      try {
        const res = await connectDiscordProject(
          user!.token,
          guildId!,
          projectId!,
        );
        console.log(res);
        toast.success('Успішно синхронізовано');
      } catch (err) {
        toast.error('Помилка в синхронізації');
      } finally {
        navigate('/crm/projects');
      }
    };
    if (projectId && guildId) {
      connect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-text-black overflow-hidden z-50">
      <Spinner />
    </div>
  );
};

export default ConnectToDiscordProject;
