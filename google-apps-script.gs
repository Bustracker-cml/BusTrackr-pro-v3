function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents); // ✅ Parse JSON
    const scannedId = data.scanned;

    const ss = SpreadsheetApp.openById('1iFhVOPnwHBxb5-vS11nhZQJAErFIb2liC4v0bAxTsUs');
    const dataSheet = ss.getSheetByName('Data');
    const ticketsSheet = ss.getSheetByName('Bus Tickets');

    const validIDs = ticketsSheet.getRange(2, 1, ticketsSheet.getLastRow() - 1).getValues().flat();
    const isValid = validIDs.includes(scannedId);

    const date = new Date();
    const refNo = Math.floor(100000 + Math.random() * 900000); // random Ref No

    dataSheet.appendRow([
      refNo,            // A: Ref No
      scannedId,        // B: Scanned ID
      "",               // C: (unused)
      date.toLocaleDateString(), // D: Date
      "", "", "", "",   // E-I: unused
      date.toLocaleTimeString(), // J: Time
      "", "", "", "", "", "",    // filler for K-P
      isValid ? "✅ Valid ID" : "❌ Invalid ID"  // Q or wherever your status column is
    ]);

    return ContentService.createTextOutput(isValid ? "✅ Valid ID" : "❌ Invalid ID");

  } catch (err) {
    return ContentService.createTextOutput("❌ Error: " + err.message);
  }
}