export const handleError = (snackBar) => err => {
  console.log(err);
  const sbConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: 'error-msg'
  };

  if (typeof err.error === 'string') {
    snackBar.open(err.error, '', sbConfig);
  } else {
    snackBar.open('Unknown error', '', sbConfig);
  }
};
