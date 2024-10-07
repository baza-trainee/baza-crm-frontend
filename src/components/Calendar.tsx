import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from './../assets/common/calendar.svg';

type CalendarProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | null) => void;
  text: string;
};

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
  text,
}) => {
  const CustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void; className?: string }
  >(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
      {value || new Date().toLocaleDateString()}
      <img src={calendarIcon} alt="calendar icon" />
    </button>
  ));

  return (
    <div className="flex pb-4 justify-between items-center	">
      <span>{text}</span>
      <DatePicker
        customInput={
          <CustomInput className="flex w-[168px] h-[72px] p-1.5 gap-[6px] cursor-pointer items-center border-card-border border-2 border-solid rounded bg-white justify-center" />
        }
        selected={selectedDate}
        onChange={onDateChange}
      />
    </div>
    // <div className="px-4 py-4 pt-4 ">
    //   <div className="pb-4">
    //     <span>Період реєстрації</span>
    //   </div>
    //   <div className="flex pb-4 justify-between items-center	">
    //     <span>з</span>

    //     {
    //       <DatePicker
    //         customInput={
    //           <CustomInput className="flex w-[168px] h-[72px] p-1.5 gap-[6px]  cursor-pointer items-center border-card-border border-2 border-solid rounded bg-white justify-center font-Lato font-normal text-base" />
    //         }
    //         selected={selectedDateFrom}
    //         onChange={onDateChangeFrom}
    //         form="external-form"
    //       />
    //     }
    //   </div>
    //   <div className="flex pb-4 justify-between items-center	">
    //     <span>по</span>
    //     <DatePicker
    //       customInput={
    //         <CustomInput className="flex w-[168px] h-[72px] p-1.5 gap-[6px] cursor-pointer items-center border-card-border border-2 border-solid rounded bg-white justify-center" />
    //       }
    //       selected={selectedDateTo}
    //       onChange={onDateChangeTo}
    //     />
    //   </div>
    // </div>
  );
};
export default Calendar;
