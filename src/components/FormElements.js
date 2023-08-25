export const Input = ({
  id,
  labelText,
  isRequired,
  type,
  placeholder,
  register,
  rules,
  errors,
}) => {
  return (
    <>
      <label htmlFor={id} className="inline-block w-full text-lg mb-2">
        {labelText} {isRequired && <span className="text-[#c61212]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className="inline-block w-full rounded-md text-[#1d020f] font-medium bg-[#fafafa] border-[#dad6ce] focus:border-[#e9900c] focus:ring-0"
      ></input>
      {errors[id] && (
        <span className="text-[#bf2116] ml-2 before:content-['⚠'] before:inline-block">
          {" "}
          {errors[id]?.message}
        </span>
      )}
    </>
  );
};

export const Textarea = ({
  id,
  labelText,
  placeholder,
  register,
  rules,
  errors,
}) => {
  return (
    <>
      <label htmlFor={id} className="inline-block w-full text-lg mb-2">
        {labelText}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        {...register(id, rules)}
        className="inline-block w-full rounded-md text-[#1d020f] font-medium bg-[#fafafa] border-[#dad6ce] focus:border-[#e9900c] focus:ring-0"
      ></textarea>
      {errors[id] && (
        <span className="text-[#bf2116] ml-2 before:content-['⚠'] before:inline-block">
          {" "}
          {errors[id]?.message}
        </span>
      )}
    </>
  );
};
