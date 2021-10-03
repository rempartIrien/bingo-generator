import React, { useEffect, useState } from 'react';

interface ThemeSwitcherProps {
  themeChange: (isKarMode: boolean) => unknown;
}

const foo: boolean = isDarkModeEnabled();

function ThemeSwitcher({ themeChange }: ThemeSwitcherProps): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState(foo);

  useEffect(() => {
    themeChange(isDarkTheme);
  }, [themeChange, isDarkTheme]);

  return (
    <label>
      Dark mode
      <input
        type="checkbox"
        checked={isDarkTheme}
        onChange={(event) => setIsDarkTheme(event.target.checked)}></input>
    </label>
  );
}

function isDarkModeEnabled(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default ThemeSwitcher;
