import PostitBoard from "./components/PostitBoard";
import React, { ReactNode, ReactHTMLElement } from "react";

export default function App() {
  function handleClick() {
    console.log("click");
  }

  return (
    <main className='h-[100vh] overflow-hidden'>
      <PostitBoard />
      {/* <Button ref={buttonRef} onClick={handleClick}>
        Click me
      </Button> */}
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
