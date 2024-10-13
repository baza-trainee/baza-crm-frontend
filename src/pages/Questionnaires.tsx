import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Spinner from '../components/Spinner';
import TableBody from '../components/Questionnaires/TableBody';
import TableHead from '../components/Questionnaires/TableHead';
import { RootState } from '../types';
import { getTags } from '../utils/tagApi';
import { getUserRequests, updateUserRequest } from '../utils/userRequestApi';

const Questionnaires = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.userState.user);

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    number[]
  >([]);
  const [resolvedFilter, setResolvedFilter] = useState<boolean>(false);

  const {
    data: userRequests,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['userRequests', user?.token, resolvedFilter],
    queryFn: () => getUserRequests(user!.token, resolvedFilter),
    enabled: !!user?.token,
  });

  const {
    data: tags,
    isError: isTagsError,
    isPending: isTagsPending,
  } = useQuery({
    queryKey: ['tags', user?.token],
    queryFn: () => getTags(user!.token),
    enabled: !!user?.token,
  });

  const specializations = tags?.filter((tag) => tag.isSpecialization === true);

  const filteredUsers = selectedSpecializations.length
    ? userRequests?.filter((user) => {
        const specializationId = specializations?.find(
          (tag) => tag.name === user.specialization,
        )?.id;

        return selectedSpecializations.includes(specializationId ?? -1);
      })
    : userRequests;

  const mutation = useMutation({
    mutationFn: updateUserRequest,
    onSuccess: () => {
      toast.success('Заявка успішно оброблена');
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    },
    onError: () => {
      toast.error('Не вдалося обробити заявку');
    },
  });

  const handleAccept = (requestId: number) => {
    const token = user?.token;
    if (token) {
      mutation.mutate({ token, requestId, accepted: true });
    }
  };

  const handleReject = (requestId: number) => {
    const token = user?.token;
    if (token) {
      mutation.mutate({ token, requestId, accepted: false });
    }
  };

  if (isPending || isTagsPending) {
    return <Spinner />;
  }

  if (isError || isTagsError) {
    return (
      <section className="flex w-full gap-5 px-8 py-5 bg-light-blue-bg height-100">
        <h2 className="text-2xl text-center mt-[10%]">
          Виникла помилка при завантаженні. Спробуйте пізніше.
        </h2>
      </section>
    );
  }

  return (
    <main className="flex flex-col w-full gap-5 height-100 p-7">
      <div className="h-[60px] flex justify-center items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border">
        <h1>Робота з анкетами</h1>
      </div>
      <div className="rounded-[10px] border-card-border border overflow-scroll flex-grow">
        <table className="w-full bg-white table-fixed">
          <TableHead
            {...{
              specializations,
              selectedSpecializations,
              setSelectedSpecializations,
              resolvedFilter,
              setResolvedFilter,
            }}
          />
          <TableBody
            {...{
              filteredUsers,
              handleAccept,
              handleReject,
            }}
          />
        </table>
      </div>
    </main>
  );
};

export default Questionnaires;
