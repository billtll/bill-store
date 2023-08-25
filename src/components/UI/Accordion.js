const Accordion = ({ title, content, isOpen, onToggle }) => {
  const handleClick = () => {
    onToggle();
  };

  return (
    <div
      className={`cursor-pointer rounded-lg p-5 mb-3 lg:mb-6 ${
        isOpen
          ? "border-2 border-[#c61212] hover:bg-[#fefbf8]"
          : "hover:bg-[#fce9dd]"
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-[#636363] text-lg font-semibold lg:text-2xl">
          {title}
        </h4>
        {isOpen ? (
          <div className="text-[#c61212]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ) : (
          <div className="text-[#c61212]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="mt-2 text-[#e9900c] text-base font-semibold lg:text-xl">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
