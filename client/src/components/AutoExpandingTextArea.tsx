import { twMerge } from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<HTMLTextAreaElement>) => void;
}

const AutoExpandingTextArea = ({
  className,
  placeholder,
  value,
  onChange,
  onPointerLeave,
}: Props) => {
  return (
    <TextareaAutosize
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onPointerLeave={onPointerLeave}
      className={twMerge(
        `${className} relative w-full bg-transparent resize-none outline-none`
      )}></TextareaAutosize>
  );
};

export default AutoExpandingTextArea;
