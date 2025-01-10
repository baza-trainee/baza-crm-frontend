import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '../types';
import { loginUser } from '../features/userSlice';

const ConnectToDiscordProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get('state');
    const guild_id = params.get('guild_id');
    const user: Auth = JSON.parse(localStorage.getItem('user')!);
    dispatch(loginUser(user));
    if (projectId && guild_id) {
      // TODO: create a function to connect to the discord server - waiting endpoint
      navigate(`/crm/projects`);
    }
  }, []);

  return <div>ConnectToDiscordServer</div>;
};

export default ConnectToDiscordProject;
