import { useSnackbar } from 'notistack';
import { getError } from '../util/error';

const alertMap = {
  success: 'success',
  danger: 'error',
  notice: 'info',
  warning: 'warning',
} as const;

type AlertType = keyof typeof alertMap;

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();
  // ALERT
  const addAlert = (msg, type: AlertType = 'success') => {
    enqueueSnackbar(msg, {
      variant: alertMap[type],
      persist: false,
    });
  };

  const addParsedAlert = (err, msg = 'Failed', type) =>
    addAlert(getError(err, msg), type);

  return { addAlert, addParsedAlert };
};
