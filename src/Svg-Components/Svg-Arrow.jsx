export default function SvgArrow() {
  return (
    // Left Arrow Icon (SVG)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      className="icon flat-line"
      data-name="Flat Line"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 12h18"
        style={{
          fill: "none",
          stroke: "#777",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path
        d="m18 15 3-3-3-3"
        data-name="primary"
        style={{
          fill: "none",
          stroke: "#777",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
    </svg>
  );
}
