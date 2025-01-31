export default function Summary({ summary }) {
  return (
    <div id={summary.id}>
      <div id="summary-title">{summary.title}</div>
      <div id="summary-text">
        {summary.placeholder ? summary.placeholder : ""}
      </div>
    </div>
  );
}
