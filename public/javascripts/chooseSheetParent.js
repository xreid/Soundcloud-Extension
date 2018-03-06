'use strict'

tableau.extensions.initializeAsync().then(function() {
    
});

function showDialog() {
  tableau.extensions.ui.displayDialogAsync('http://localhost:3000/choose-sheet-dialog').then((payload) => {
    console.log("Dialog closed with payload: " + payload);
  }).catch((error) => {
    // This will be hit if the user manually closes the dialog
    switch(error.errorCode) {
      case tableau.ErrorCodes.DialogClosedByUser:
        console.log("Dialog was closed by user");
        break;
      default:
        console.error(error.message);
    }
  });
}

$('#choose-sheet').click(() => {
  showDialog();
});
