
import { useEffect } from 'react';

export function useKeyListener(key:string,fn:any){

     useEffect(() => {
            const keyDownHandler = event => {
            if (event.key === key) {
                event.preventDefault();
                fn()
            }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
}