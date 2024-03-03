import { twMerge } from "tailwind-merge";

interface HorizontalLogoProps {
  className?: string;
}

const HorizontalLogo = ({ className }: HorizontalLogoProps) => {
  return (
    <button
      onClick={() => {
        window.location.href = "/dashboard";
      }}>
      <div className={twMerge(`${className} flex items-center`)}>
        <img
          src="./assets/images/Logo.png"
          alt="Logo"
          className="object-contain h-8 w-12"
        />
        <h1 className="title text-sm">Candlelight</h1>
      </div>
    </button>
  );
};

export default HorizontalLogo;
