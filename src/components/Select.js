import { forwardRef } from "react";
import { useGlobalContext } from "../context";
import Characters from "./Characters"

const Select = forwardRef((props, ref) => {
  const { showSelect } = useGlobalContext()

  return (
    <div className="select" ref={ref} style={{display: showSelect ? "block" : "none"}}>
      <Characters />
    </div>
  );
})

export default Select;