import ActionBarIcon from "./ActionBarIcon";
import * as LineIcons from "@styled-icons/remix-line";
import * as FillIcons from "@styled-icons/remix-fill";

const ActionBar = () => {
  return (
    <div className="flex flex-col h-screen border-r p-5 gap-5">
      <ActionBarIcon
        tooltip="Notes"
        onClick={() => {
          window.location.href = "/notes";
        }}>
        {window.location.pathname == "/notes" ? (
          <FillIcons.StickyNote />
        ) : (
          <LineIcons.StickyNote />
        )}
      </ActionBarIcon>
      <ActionBarIcon
        tooltip="Tasks"
        onClick={() => {
          window.location.href = "/tasks";
        }}>
        {window.location.pathname == "/tasks" ? (
          <FillIcons.Task />
        ) : (
          <LineIcons.Task />
        )}{" "}
      </ActionBarIcon>
    </div>
  );
};

export default ActionBar;
