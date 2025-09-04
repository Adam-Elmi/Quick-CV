import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";

export default function Preview({ content }: {content: string}) {
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      (contentRef.current as HTMLElement).innerHTML = content;
    }
  }, [content]);
  return (
    <div className="min-h-screen p-2">
      <h1>Templates</h1>
      <div className="w-full flex justify-center items-center">
        <div
          ref={contentRef}
          className="w-[595px]  h-[842px] border-2 border-slate-200 shadow-xl max-[880px]:scale-80 max-[880px]:transform"
        ></div>
      </div>
    </div>
  );
}

Preview.propTypes = {
  content: PropTypes.any,
};
