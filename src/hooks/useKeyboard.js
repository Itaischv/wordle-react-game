import { useEffect } from "react";



export default function useKeyboard(callback) {

    window.addEventListener("keydown", callback);

    return () => window.removeEventListener("keydown", callback);
}

