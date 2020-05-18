
function closeModal(){
    $('#modalComms').modal('hide');
}

function loadingModal(loadingText){
    $('#modalAccept').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> '+loadingText);
    $('#modalAccept').prop('disabled', true);
}
/**
 * opens the modal with the given info
 * @param {string} title 
 * @param {string} msg 
 * @param {string} accept 
 * @param {string} cancel 
 * @param {string} loadingText 
 * @param {function} acceptFunc 
 * @param {function} cancelFunc 
 */
function sendModalComm(title, msg, accept, cancel, loadingText, acceptFunc, cancelFunc) {
    $('#modalTitle').html(title);

    $('#modalMsg').html(msg);

    $('#modalCancel').html(cancel);
    $('#modalAccept').html(accept);


    $('#modalAccept').prop('hidden',false);
    $('#modalAccept').prop('disabled', false);

    $('#modalCancel').off("click");
    $('#modalAccept').off("click");

    $('#modalCancel').on("click",()=>{cancelFunc();closeModal();});
    $('#modalAccept').on("click",()=>{loadingModal(loadingText);acceptFunc();});
        
    $('#modalComms').modal({
        backdrop: 'static',
        keyboard: false
    });
}

/**
 * Send update message
 * @param {string} title 
 * @param {string} msg 
 */

function UpdateModal(title, msg){
    $('#modalTitle').html(title);

    $('#modalMsg').html(msg);

    $('#modalCancel').html("chidi");
    $('#modalCancel').off("click");
    $('#modalCancel').on("click",()=>{closeModal();});
    $('#modalAccept').prop('hidden',true);
        
    $('#modalComms').modal({
        backdrop: 'static',
        keyboard: false
    });
}