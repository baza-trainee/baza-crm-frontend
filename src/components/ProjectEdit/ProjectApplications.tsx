import Modal from 'react-modal';
import './ProjectApplications.css';
import TableHeadApplications from './TableHeadApplications';
import TableBodyApplications from './TableBodyApplications';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../types';
import { getUserRequests, updateUserRequest } from '../../utils/userRequestApi';
import { getTags } from '../../utils/tagApi';
import Spinner from '../Spinner';
import { RiCloseLine } from 'react-icons/ri';

Modal.setAppElement('#root');

interface ProjectApplicationsProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

// const sampleData = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     linkedin: 'https://incompatible-heifer.biz',
//     projectPoints: 5,
//     karmaPoints: 5,
//     status: 'accepted',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     linkedin: 'https://incompatible-heifer.biz',
//     projectPoints: 1,
//     karmaPoints: 4,
//     status: 'declined',
//   },
//   {
//     id: 3,
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//     linkedin: 'https://incompatible-heifer.biz',
//     projectPoints: 8,
//     karmaPoints: 2,
//     status: 'accepted',
//   },
// ];

const ProjectApplications: React.FC<ProjectApplicationsProps> = ({
  modalIsOpen,
  closeModal,
}) => {
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Project Applications"
      className="flex flex-col w-11/12 gap-5 p-8 mx-auto my-10 bg-white rounded-md modal-content max-h-[85%]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-overlay"
      closeTimeoutMS={300}
    >
      <div className="h-[60px] flex justify-center items-center text-2xl font-bold text-text-black bg-white rounded-[10px] border-card-border border">
        <h1>Робота з заявками</h1>
        <RiCloseLine
          className="absolute duration-500 rounded-lg cursor-pointer size-8 text-normal-ui hover:text-red right-1 top-1"
          onClick={closeModal}
        />
      </div>
      <div className="rounded-[10px] border-card-border border overflow-scroll flex-grow">
        <table className="w-full bg-white table-fixed">
          <TableHeadApplications
            {...{
              specializations,
              selectedSpecializations,
              setSelectedSpecializations,
              resolvedFilter,
              setResolvedFilter,
            }}
          />
          <TableBodyApplications
            {...{
              filteredUsers,
              handleAccept,
              handleReject,
            }}
          />
        </table>
      </div>
    </Modal>
  );
};

export default ProjectApplications;
