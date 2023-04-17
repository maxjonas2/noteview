import { useEffect, useState, useRef } from "react";
import Postit from "./Postit";
import socket, { Socket } from "socket.io-client";
import { v4 } from "uuid";

import type { PostitProps } from "./Postit";

const PostitBoard = ({ isPresenter = false }: { isPresenter: boolean }) => {
  const [postits, setPostits] = useState<PostitProps[]>([]);

  const io = useRef<Socket>();

  function handleContentChange(index: number, value: string) {
    setPostits((postits) =>
      postits.map((postit) => {
        if (postit.id === index) {
          return { ...postit, content: value };
        } else {
          return postit;
        }
      })
    );
  }

  useEffect(() => {
    io.current = socket("http://localhost:3000");

    io.current.on("confirm", (message: any) => console.log(message));
  }, []);

  useEffect(() => {
    if (io.current) {
      io.current.emit("changeEvent", postits);
    }
  }, [postits.length]);

  function addPostit() {
    const newPostit: PostitProps = {
      id: postits.length,
      content: "",
      posX: 0,
      posY: 0,
      onContentChange: handleContentChange,
    };

    setPostits([...postits, newPostit]);
  }

  return (
    <div className='h-full bg-zinc-300 relative'>
      {postits.map((postit) => {
        return (
          <Postit
            key={postit.id}
            id={postit.id}
            content={postit.content}
            onContentChange={postit.onContentChange}
            posX={postit.posX}
            posY={postit.posY}
          />
        );
      })}
      <button
        onClick={addPostit}
        className='absolute bottom-3 right-3 p-4 bg-slate-500'
      >
        Add
      </button>
    </div>
  );
};

export default PostitBoard;
