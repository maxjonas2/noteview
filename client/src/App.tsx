import PostitBoard from "./components/PostitBoard";
import React, { ReactNode, ReactHTMLElement, useState } from "react";

export default function App() {
  function handleClick() {
    console.log("click");
  }

  const [isPresenter, setIsPresenter] = useState<boolean>(false);

  return (
    <main className='h-[100vh] overflow-hidden relative'>
      <PostitBoard isPresenter={isPresenter} />
      {/* <Button ref={buttonRef} onClick={handleClick}>
        Click me
      </Button> */}
      <button
        className='absolute bottom-2 left-2 p-2 bg-slate-800 text-white disabled:bg-slate-400'
        onClick={() => setIsPresenter(true)}
        disabled={isPresenter}
      >
        {isPresenter ? "Presenting" : "Present"}
      </button>
    </main>
  );
}

const Button = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button ref={ref} className='btn' {...props}>
      {props.children}
    </button>
  );
});
