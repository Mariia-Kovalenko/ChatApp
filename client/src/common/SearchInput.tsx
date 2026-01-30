import type { ChangeEvent } from "react";

type SearchInputProps = {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    onClear?: () => void;
};

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    onClear,
}: SearchInputProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="p-4 relative">
            <input
                value={value}
                onChange={handleChange}
                type="text"
                placeholder={placeholder}
                className="w-full p-2 border border-gray-400 rounded text-sm outline-none"
            />
            {value && (
                <button
                    className="absolute right-7 text-gray-400 top-[50%] translate-y-[-50%]"
                    onClick={onClear}
                >
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                            fill="#2C2C2C"
                            fill-opacity="0.8"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
