import type { ReactNode } from "react";

type ButtonProps = {
    onClick: () => void;
    children?: ReactNode;
    disabled?: boolean;
}

export default function Button({onClick, disabled, children}: ButtonProps) {

    return (
        <button 
          onClick={onClick}
          disabled={disabled}
          className="h-[50px] min-w-[50px] flex items-center justify-center text-white text-sm md:text-md whitespace-nowrap p-3 rounded font-semibold disabled:bg-gray-400 bg-[#4a90e2] transition-colors"
        >
          {children}
        </button>
    )

}