import React, { useEffect, useState } from "react";

interface ToggleProps {
  onToggle: Function;
  children: (props: { on: boolean; toggle: () => void }) => React.ReactElement;
}

const Toggle = ({ children, onToggle }: ToggleProps) => {
  const [on, setOn] = useState(false);

  const toggle = () => setOn((prevOn) => !prevOn);

  useEffect(() => {
    onToggle(on);
  }, [on]);

  return children({ on, toggle });
};

export default Toggle;
