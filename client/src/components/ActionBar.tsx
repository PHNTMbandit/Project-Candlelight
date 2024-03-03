import { NoteSticky } from "@styled-icons/fa-regular/NoteSticky";
import ActionBarIcon from "./ActionBarIcon";

const ActionBar = () => {
  return (
    <div className="flex flex-col h-screen border-r p-5">
      <ActionBarIcon
        className=""
        tooltip="Notes"
        onClick={() => {
          window.location.href = "/notes";
        }}>
        <NoteSticky />
      </ActionBarIcon>
    </div>
  );
};

export default ActionBar;
