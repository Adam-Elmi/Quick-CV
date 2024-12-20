export default function SvgFile() {
  return (
    // File Icon (SVG)
    <svg
      className="hover:fill-indigo-600 hover:stroke-indigo-600"
      width={18}
      height={18}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 0 32 32"
    >
      <title>{"file-document"}</title>
      <path
        className="fill-current stroke-current"
        fill="#000"
        fillRule="evenodd"
        d="M20 8a2 2 0 0 1-2-2V2l6 6h-4Zm-2-8v.028L4 0a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V8l-8-8Z"
      />
    </svg>
  );
}
// Used in Sidebar component