import { useEffect } from "react";

export default function useKeyboard(callback, deps) {
    useEffect(() => {
        window.addEventListener("keydown", callback);

        return () => window.removeEventListener("keydown", callback);
    }, deps);

}

