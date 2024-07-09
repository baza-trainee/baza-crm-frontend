const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 max-w-[150px] h-[1060px] bg-[#3B3E57] text-[#888888]">
      {/* <h1>Sidebar</h1> */}
      <ul className="flex flex-col place-content-center text-center font-['Open_Sans'] text-base">
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div>
            <h2>Портал учасника</h2>
          </div>
        </li>
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div className="h-[95px]">
            <h2>Проєкти</h2>
          </div>
        </li>
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div className="h-[95px]">
            <h2>База знань</h2>
          </div>
        </li>
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div className="h-[95px]">
            <h2>Новини</h2>
          </div>
        </li>
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div className="h-[95px]">
            <h2>Програма лояльності</h2>
          </div>
        </li>
        <li className="max-w-[100px] h-[95px] hover:text-[#E4F1FF] hover:bg-[#788AA0]">
          <div className="h-[95px]">
            <h2>Події та заходи</h2>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
