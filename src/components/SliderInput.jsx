import { numberWithCommas } from "../utils/helpers";

const SliderInput = ({
  title,
  underlineTitle,
  min,
  max,
  state,
  onChange,
  labelMin,
  labelMax,
}) => {
  return (
    <>
      <span className="title">{title}</span>
      {state > 0 && <span className="title">{underlineTitle}</span>}
      <div>
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          value={state}
          onChange={onChange}
        />

        <div className="labels">
          <span>{labelMin ?? numberWithCommas(min)}</span>
          <span>{state}</span>
          <span>{labelMax ?? numberWithCommas(max)}</span>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
