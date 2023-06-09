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
  onDeleteClick: (index: number) => void;
};

const handleMouseDown = (
  e: MouseEvent,
  postitElement: HTMLDivElement,
  onPositionChange: PositionChangeEvent,
  postitIndex: number
) => {
  const { clientX, clientY } = e;
  const { offsetLeft, offsetTop } = postitElement;

  const move = (e: MouseEvent) => {
    const { pageX: x, pageY: y } = e;
    postitElement.style.left = `${offsetLeft + x - clientX}px`;
    postitElement.style.top = `${offsetTop + y - clientY}px`;
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
  onDeleteClick,
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

  function animateDeletion(): Promise<void> {
    return new Promise((resolve) => {
      if (postit.current) {
        postit.current.onanimationend = () => {
          resolve();
        };
        postit.current.classList.add("postit-deleted");
      }
    });
  }

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
      <button
        className='absolute top-0 right-0 p-1'
        onClick={() =>
          animateDeletion().then(() => {
            onDeleteClick(id);
          })
        }
      >
        Delete
      </button>
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
