import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserEventsTypes } from '@/types';

type ThemeTogglerProps = {
  registerUserEvent: (type: UserEventsTypes, value: string | number | boolean | Date) => void;
};

function ThemeToggler({ registerUserEvent }: ThemeTogglerProps) {
  const { setTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    registerUserEvent(UserEventsTypes.THEME, theme);
  };

  return (
    <DropdownMenu data-testid="theme-toggler">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" data-testid="toggle-button">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem data-testid="light-option" onClick={() => handleThemeChange('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem data-testid="dark-option" onClick={() => handleThemeChange('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem data-testid="system-option" onClick={() => handleThemeChange('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggler;
