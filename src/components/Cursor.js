import { forwardRef } from "react";

const Cursor = forwardRef((props, ref) => {
  return (
    <div className="cursor" ref={ref}>
    </div>
  );
})

export default Cursor;