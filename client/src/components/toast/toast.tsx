interface IToast {
    isOpen: boolean;
    type: "success" | "warning" | "danger";
    text: string;
}

const Toast: React.FC<IToast> = ({ isOpen, type, text }) => {
    if (!isOpen) return null;

    return (
        <div
            id="toast-danger"
            className={`flex absolute bottom-5 max-w-max items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
            role="alert"
        >
            <div className="text-sm font-normal mx-auto">{text}</div>
        </div>
    );
};

export default Toast;
