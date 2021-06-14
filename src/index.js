var isTreatmentOnHold = false;

var bellhop = new Bellhop();
    bellhop.connect();

if (!bellhop.supported)
{
    // Cannot connect to parent page probably
    // because we aren't within an iframe
    console.log("bellhop connection error");
}
else
{
    console.log("bellhop.init");
    bellhop.send('init');
}

bellhop.on('context', function(event) {
    //console.log('On context:');
    //console.log(JSON.stringify(event));
    //
    //
    //
    //event.data has lab, case, case_params, meta properties
    // ... see casedata.json for an example of what's passed into this call
    //
    //
    //
    //
    var notes = event.data.case.notes;
    //
    //
    if (typeof(event.data.case.on_hold) != "undefined"  && typeof(event.data.case.meta.onhold_proposal) != "undefined") {
        isTreatmentOnHold = true;
    }
});

//call for context (callback above)
bellhop.send('context', 'case');

//called by dialog event onbeforedialogclose
bellhop.on('TxSave', function(event) {
    //console.log('On TxSave');
    //e.g. app saves open note, for example
    //
    //
    bellhop.send('TxClose', {});
});


/* app's methods */

function Approve() {
    //console.log('Send TxApprove');
    bellhop.send('TxApprove', {});    
}

function Reject() {
    //console.log('Send TxReject');
    bellhop.send('TxReject', {});
}

function SaveNote(noteData) {
    //console.log('Send TxAddNote (add note to case):');
    //console.log(noteData);
    bellhop.send('TxAddNote', { reason: noteData });
}

function Close() {
    //console.log('Send TxClose');
    bellhop.send('TxClose', {});
}