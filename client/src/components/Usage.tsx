import React from "react";
import Toggle from "./Toggle";

export default function Usage() {
  function handleToggle(isOn: boolean) {
    if (!isOn) return;
    // Implement function logic here
  }

  return (
    <Toggle onToggle={handleToggle}>
      {({ on, toggle }) => (
        <div>
          {on ? "The button is on" : "The button is off"}
          <Switch on={on} onClick={toggle} />
          <div style={{ display: on ? "none" : "block" }}>I'm visible!</div>
          <hr />
          <button aria-label='custom-button' onClick={toggle}>
            {on ? "on" : "off"}
          </button>
        </div>
      )}
    </Toggle>
  );
}

function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ background: on ? "green" : "gray", padding: "1rem" }}
    >
      {on ? "I'm on" : "Off :/"}
    </div>
  );
}
