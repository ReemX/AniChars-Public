import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Test() {
  const [switcher, setSwitch] = useState(false);

  return (
    <div>
      <DarkModeSwitch
        size={400}
        checked={switcher}
        onClick={() => setSwitch((t) => !t)}
      />
    </div>
  );
}

export default Test;
