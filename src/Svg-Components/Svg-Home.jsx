export default function SvgHome() {
  return (
    // Home Icon (SVG)
    <svg
      className="hover:fill-indigo-600 hover:stroke-indigo-600"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        className="fill-current stroke-current"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6.5 20v-9H3l9-6 9 6h-3.5v9h-3v-3.5A1.5 1.5 0 0 0 13 15h-2a1.5 1.5 0 0 0-1.5 1.5V20h-3Z"
      />
    </svg>
  );
}
// Used in Sidebar component