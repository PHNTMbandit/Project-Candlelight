import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ActionBarIconProps {
  children?: ReactNode;
  className: string;
  tooltip: string;
  onClick: () => void;
}

const ActionBarIcon = ({
  children,
  className,
  tooltip,
  onClick,
}: ActionBarIconProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={twMerge(
              `${className} w-6 rounded hover:outline hover:outline-offset-8 hover:cursor-pointer`
            )}
            onClick={onClick}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionBarIcon;
