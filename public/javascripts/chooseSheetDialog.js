'use strict'

tableau.extensions.initializeDialogAsync().then((initialPayload) => {
  // function showChooseSheetDialog () {
    // Clear out the existing list of sheets
    $('#choose-sheet-buttons').empty();

    // Set the dashboard's name in the title
    const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
    $('#choose-sheet-title').text(dashboardName);

    // The first step in choosing a sheet will be asking Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Next, we loop through all of these worksheets and add buttons for each one
    worksheets.forEach((worksheet) => {
      const worksheetName = worksheet.name;      
      // Declare our new button which contains the sheet name
      const button = $(`<button type='button' class='btn btn-default btn-block btn-outline-warning'>${worksheetName}</button>`);

      // Create an event handler for when this button is clicked
      button.click(() => {
        // Get the worksheet name and save it to settings.
        // tableau.extensions.settings.set('sheet', worksheetName);
        // tableau.extensions.settings.saveAsync().then(function () {
          // close
          tableau.extensions.ui.closeDialog(worksheetName);
          
        // });
      });

      // Add our button to the list of worksheets to choose from
      $('#choose-sheet-buttons').append(button);
    });
  // }
});
