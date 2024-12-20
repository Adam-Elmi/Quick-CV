export default function SvgWarn() {
  return (
    // Warn/Danger Icon (SVG)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 22 22"
    >
      <defs>
        <linearGradient id="a">
          <stop
            offset={0}
            style={{
              stopColor: "#fcd994",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#fff6e1",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
      <path
        d="m11 1032.362-10 18h20zm0 2 8 15H3z"
        style={{
          fill: "#ffc35a",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 1,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: 1,
        }}
        transform="translate(0 -1030.362)"
      />
      <path
        d="M10 1046.362h2v2h-2zM10 1045.362h2v-6h-2z"
        style={{
          fill: "#373737",
          fillOpacity: 0.94117647,
          stroke: "none",
          strokeWidth: 1,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: 1,
        }}
        transform="translate(0 -1030.362)"
      />
    </svg>
  );
}
// Used in Generate component