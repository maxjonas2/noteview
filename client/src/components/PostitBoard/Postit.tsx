import { useEffect, useRef } from "react";

const handleMouseDown = (e: MouseEvent, postitElement: HTMLDivElement) => {
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
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

export interface PostitProps {
  id: number;
  content: string;
  onContentChange: ((id: number, content: string) => void) | null;
  posX: number;
  posY: number;
  isPresenter: boolean;
}

const Postit = ({
  id,
  content,
  onContentChange,
  posX,
  posY,
  isPresenter,
}: PostitProps) => {
  const postit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const postitElement = postit.current;
    if (postitElement) {
      postitElement.addEventListener("mousedown", (e) =>
        handleMouseDown(e, postitElement)
      );
    }
  }, []);

  return (
    <div
      ref={postit}
      className='w-44 h-44 p-4 bg-[rgb(147,147,26)] absolute top-0 left-0 shadow-md'
    >
      <textarea
        disabled={isPresenter}
        spellCheck={false}
        className={`w-full h-full outline-none bg-transparent resize-none ${
          isPresenter ? "" : "pointer-events-none"
        }`}
        value={content}
        onChange={(e) => onContentChange!(id, e.target.value)}
      ></textarea>
    </div>
  );
};

export default Postit;
