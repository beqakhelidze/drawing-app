import Toast from "@/components/toast/toast";
import { useCallback, useState } from "react";

interface UseToastInterface {
    isToastOpen: boolean;
    showToast: () => void;
}

const useToast = (): UseToastInterface => {
    const [isToastOpen, setToastOpen] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const showToast = useCallback(() => {
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

    return { isToastOpen, showToast };
};

export default useToast;
