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
      <img className="size-10" src={calendarIcon} alt="calendar icon" />
    </button>
  ));

  return (
    <div className="flex justify-between items-center">
      <span>{text}</span>
      <DatePicker
        customInput={
          <CustomInput className="flex p-3  text-sm gap-[6px] cursor-pointer items-center border-card-border border-2 border-solid rounded bg-white justify-center" />
        }
        selected={selectedDate}
        onChange={onDateChange}
      />
    </div>
  );
};
export default Calendar;
