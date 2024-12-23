import { RxCross1 } from 'react-icons/rx';
import Modal from 'react-modal';

const SuccessApplyPopUp = ({
  openSuccessApplyPopUp,
  handleCloseSuccessApplyPopUp,
}: {
  openSuccessApplyPopUp: boolean;
  handleCloseSuccessApplyPopUp: () => void;
}) => {
  return (
    <Modal
      isOpen={openSuccessApplyPopUp}
      onAfterClose={handleCloseSuccessApplyPopUp}
      onRequestClose={handleCloseSuccessApplyPopUp}
      style={{
        overlay: {
          backgroundColor: 'rgba(145, 162, 182, 0.7)',
          zIndex: '50',
        },
        content: {
          backgroundColor: '#F8F9FD',
          zIndex: '100',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          padding: '50px 50px 100px',
          transform: 'translate(-45%, -48%)',
          borderWidth: '1px',
          borderRadius: '10px',
        },
      }}
    >
      <div className="flex flex-col gap-10">
        <div className="flex justify-end">
          <RxCross1
            size={'20px'}
            className="cursor-pointer"
            onClick={handleCloseSuccessApplyPopUp}
          />
        </div>
        <div className="w-full px-20">
          <p className="font-bold text-xl text-center font-lato">
            Ваша заявка на участь <br /> в проєкті успішно відправлена
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessApplyPopUp;
