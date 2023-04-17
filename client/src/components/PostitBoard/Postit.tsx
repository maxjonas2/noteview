import { useEffect, useRef } from "react";

export type PositionChangeEvent = (
  index: number,
  posX: number,
  posY: number
) => void;

export type PostitProps = {
  id: number;
  content: string;
  onContentChange: ((id: number, content: string) => void) | null;
  posX: number;
  posY: number;
  isPresenter: boolean;
  onPositionChange: PositionChangeEvent;
};

const handleMouseDown = (
  e: MouseEvent,
  postitElement: HTMLDivElement,
  onPositionChange: PositionChangeEvent,
  postitIndex: number
) => {
  const { clientX, clientY } = e;
  const { left, top } = postitElement.getBoundingClientRect();

  const move = (e: MouseEvent) => {
    const { pageX: x, pageY: y } = e;
    postitElement.style.left = `${left + x - clientX}px`;
    postitElement.style.top = `${top + y - clientY}px`;
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    onPositionChange(
      postitIndex,
      postitElement.offsetLeft,
      postitElement.offsetTop
    );
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

const Postit = ({
  id,
  content,
  onContentChange,
  posX,
  posY,
  isPresenter,
  onPositionChange,
}: PostitProps) => {
  const postit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const postitElement = postit.current;
    if (postitElement) {
      postitElement.addEventListener("mousedown", (e) =>
        handleMouseDown(e, postitElement, onPositionChange, id)
      );
    }
  }, []);

  return (
    <div
      ref={postit}
      style={{
        left: posX,
        top: posY,
        transition: isPresenter ? undefined : "left .4s ease, top .4s ease",
      }}
      className={`w-44 h-44 p-4 bg-[rgb(147,147,26)] absolute shadow-md ${
        isPresenter ? "" : "pointer-events-none"
      }`}
    >
      <textarea
        disabled={!isPresenter}
        spellCheck={false}
        className={`w-full h-full outline-none bg-transparent resize-none`}
        value={content}
        onChange={(e) => onContentChange!(id, e.target.value)}
      ></textarea>
    </div>
  );
};

export default Postit;
