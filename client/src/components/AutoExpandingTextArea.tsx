import { twMerge } from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoExpandingTextArea = ({
  className,
  placeholder,
  value,
  onChange,
  onBlur,
}: Props) => {
  return (
    <TextareaAutosize
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={twMerge(
        `${className} relative w-full bg-transparent resize-none outline-none`
      )}></TextareaAutosize>
  );
};

export default AutoExpandingTextArea;
