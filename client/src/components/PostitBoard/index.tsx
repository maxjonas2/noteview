import { useState } from "react";
import Postit from "./Postit";
import socket from "socket.io-client";

const io = socket("https://teste.com");

import type { PostitProps } from "./Postit";

const PostitBoard = () => {
  const [postits, setPostits] = useState<PostitProps[]>([]);

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
