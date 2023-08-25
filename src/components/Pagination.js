const Pagination = ({ pagination, changePage }) => {
  return (
    <ul className="flex mt-5">
      <li className="rounded border text-xl">
        <a
          href="/"
          className={`w-9 h-9 flex justify-center items-center ${
            pagination.has_pre
              ? "text-[#e23b3b] hover:text-[#cc2a2a] hover:bg-gray-100"
              : "bg-gray-200 text-gray-500 pointer-events-none"
          }`}
          onClick={(e) => {
            e.preventDefault();
            changePage(pagination.current_page - 1);
          }}
        >
          <span>&laquo;</span>
        </a>
      </li>
      {[...new Array(pagination.total_pages)].map((_, i) => (
        <li
          key={`${i}_page`}
          className={`rounded border text-lg ${
            i + 1 === pagination.current_page
              ? "bg-[#e23b3b] text-white"
              : "text-[#e23b3b] hover:text-[#cc2a2a] hover:bg-gray-100"
          }`}
        >
          <a
            href="/"
            className="w-9 h-9 flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault();
              changePage(i + 1);
            }}
          >
            {i + 1}
          </a>
        </li>
      ))}
      <li className="rounded border text-xl">
        <a
          href="/"
          className={`w-9 h-9 flex justify-center items-center ${
            pagination.has_next
              ? "text-[#e23b3b] hover:text-[#cc2a2a] hover:bg-gray-100"
              : "bg-gray-200 text-gray-500 pointer-events-none"
          }`}
          onClick={(e) => {
            e.preventDefault();
            changePage(pagination.current_page + 1);
          }}
        >
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
