import Toast from "@/components/toast/toast";
import { useCallback, useState } from "react";

interface UseToastInterface {
    isToastOpen: boolean;
    showToast: (test:string) => void;
    toastText: string;
}

const useToast = (): UseToastInterface => {
    const [isToastOpen, setToastOpen] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [toastText ,setToastText] = useState("")

    const showToast = useCallback((text:string) => {
        setToastText(text);
        setToastOpen(true);

        if (timer !== null) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            setToastOpen(false);
            setTimer(null);
        }, 4000);

        setTimer(newTimer);
    }, [timer]);

    return { isToastOpen, showToast, toastText };
};

export default useToast;
