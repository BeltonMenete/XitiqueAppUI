import { toast } from "sonner";

export { toast };

export const showSuccessToast = (message: string) => {
	toast.success(message);
};

export const showErrorToast = (message: string) => {
	toast.error(message);
};

export const showInfoToast = (message: string) => {
	toast.info(message);
};

export const showWarningToast = (message: string) => {
	toast.warning(message);
};

export const showPromiseToast = <T,>(
	promise: Promise<T>,
	{
		loading,
		success,
		error,
	}: {
		loading: string;
		success: string | ((data: T) => string);
		error: string | ((error: Error) => string);
	}
) => {
	return toast.promise(promise, {
		loading,
		success,
		error,
	});
};
