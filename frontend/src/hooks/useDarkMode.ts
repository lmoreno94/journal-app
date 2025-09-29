import { useEffect, useState } from "react";

const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;

const useDarkMode = ():[string, () => void, boolean] => {
    const [ theme, setTheme ] = useState<string>('light');
    const [ mountedComponent, setMountedComponent ] = useState<boolean>(true);

    const setMode = (mode:string):void => {
        if(localStorageAvailable){
            localStorage.setItem('theme', mode);
            setTheme(mode);
        }
    }

    const themeToggler = ():void => {
        if (theme === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    useEffect(() => {
        if(localStorageAvailable){
            const localTheme = localStorage.getItem('theme');
            if (localTheme) {
                setTheme(localTheme);
            } else {
                setMode('light');
            }
            setMountedComponent(false);
        }
    }, [])

    return [theme, themeToggler, mountedComponent]
}

export { useDarkMode }