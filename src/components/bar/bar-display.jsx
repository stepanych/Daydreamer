import React, { useRef, useState, useEffect } from "react";
import style from "./bar.module.css";

export const BarDisplay = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressWidth,
  barCornerRadius,
  text,
  hasChild,
  arrowIndent,
  styles,
  onMouseDown,
}) => {
  const textRef = useRef(null);
  const [isTextInside, setIsTextInside] = useState(true);

  useEffect(() => {
    if (textRef.current)
      setIsTextInside(textRef.current.getBBox().width < width);
  }, [textRef, width]);

  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  const getX = () => {
    return isTextInside
      ? x + width * 0.5
      : x + width + arrowIndent * +hasChild + arrowIndent * 0.2;
  };

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={x}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
      <text
        x={getX()}
        y={y + height * 0.5}
        className={
          isTextInside
            ? style.barLabel
            : style.barLabel && style.barLabelOutside
        }
        ref={textRef}
      >
        {text}
      </text>
    </g>
  );
};
