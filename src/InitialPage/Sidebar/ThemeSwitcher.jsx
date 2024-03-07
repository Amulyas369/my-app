//

import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle"; // Adjust the import path according to your file structure

function ThemeSwitcher() {
  const [active, setActive] = useState(false);

  const toggleTheme = (newActive) => {
    const newTheme = newActive ? "dark" : "";
    document.body.setAttribute("data-theme", newTheme);
    setActive(newActive);
  };

  return (
    <div>
      <div className="">
        <div id="dark-mode-toggle">
          {/* Use ThemeToggle here */}
          <ThemeToggle initialValue={active} onToggle={toggleTheme} />
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
