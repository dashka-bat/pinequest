import { ResponseType } from './Responses';
import Snackbar from '@mui/material/Snackbar';

const CustomSnackbar = ({ response }: { response: ResponseType }) => {
  return (
    <Snackbar
      open={!!response}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={response.message}
    />
  );
};

export default CustomSnackbar;
