import { toast } from "sonner";

export const customToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        backgroundColor: "#f0fff4", // Light green background
        color: "#16a34a", // Green text color
      },
    });
  },
  error: (message: string) => {
    toast.error(message, {
      style: {
        backgroundColor: "#fef2f2", // Light red background
        color: "#dc2626", // Red text color
      },
    });
  },
  info: (message: string) => {
    toast.info(message, {
      style: {
        backgroundColor: "#ecfeff", // Light cyan background
        color: "#0891b2", // Cyan text color
      },
    });
  },
};
