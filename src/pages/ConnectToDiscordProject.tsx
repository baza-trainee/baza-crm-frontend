import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../types';
import { loginUser } from '../features/userSlice';
import { connectDiscordProject } from '../utils/connectBotApi';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { changeStatus } from '../utils/projectStatusApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ConnectToDiscordProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutationChangeStatus = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      toast.success('Статус успішно змінено');
      queryClient.invalidateQueries({ queryKey: ['projectWithUsers'] });
    },
    onError: () => {
      toast.error('Не вдалося змінити статус');
    },
  });
  const handleChangeStatus = () => {
    const params = new URLSearchParams(location.search);
    const projectId = Number(params.get('state'));
    const status: string = 'working';
    const token: Auth['token'] = JSON.parse(localStorage.getItem('token')!);
    if (token && projectId) {
      mutationChangeStatus.mutate({ status, token, projectId });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get('state');
    const guildId = params.get('guild_id');
    const userInfo: Auth['user'] = JSON.parse(localStorage.getItem('user')!);
    const token: Auth['token'] = JSON.parse(localStorage.getItem('token')!);
    const user = {
      token: token,
      user: userInfo,
    };
    dispatch(loginUser(user));

    const connect = async () => {
      try {
        handleChangeStatus();
        await connectDiscordProject(user!.token, guildId!, projectId!);
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
