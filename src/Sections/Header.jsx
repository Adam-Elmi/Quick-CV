export default function Header({ header, defaultValue }) {
  return (
    <div id={header.id}>
      <div id="head-container">
        {header
          ? header.fields.map((field, id) => (
              <div
                key={id}
                id="head-wrapper"
                className="flex gap-2 items-center"
              >
                <p id={field}>
                  {field.slice(0, 1).toUpperCase() + field.slice(1)} :{" "}
                </p>
                <span id={field + "_value"}>
                  {defaultValue && defaultValue[id] ? defaultValue[id] : ""}
                </span>
              </div>
            ))
          : null}
      </div>
        <div>
          {/* <img
            src={""}
            width={100}
            height={100}
            id={''}
            alt=""
          /> */}
        </div>
    </div>
  );
}
