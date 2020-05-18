<!DOCTYPE html>
<html>

<body>
    <div class="modal fade" id="modalComms" tabindex="-1" role="dialog" aria-labelledby="modalComms" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">TITOLO</h5>
                </div>
                <div id="modalMsg" class="modal-body">

                </div>
                <div class="modal-footer">
                    <button id="modalCancel" type="button" class="btn btn-danger">Cancel</button>
                    <button id="modalAccept" type="button" class="btn btn-success">Accept</button>
                </div>
            </div>
        </div>
    </div>
    <link href="/lib/css/esito.css" rel="stylesheet">
    <br>
    <div class="container">
        <?php
        if ($_GET['risultato'] == 'vittoria')
            echo '<img src="/assets/img/risultato/winning.png" class="d-block w-100" alt="vittoria">
                    <br>              
                    <h3>CONGRATULAZIONI HAI VINTO LA BATTAGLIA!</h3>';

        else
            echo '<img src="/assets/img/risultato/losing.png" class="d-block w-100" alt="sconfitta">
                    <br>
                    <h3>PURTROPPO HAI PERSO LA BATTAGLIA!</h3>'
        ?>
        <br>
        <div class="row">
            <div class="col">
                <button class="btn btn-primary button-size" onclick="return gesticiRivincita();">RIVINCITA</button>
            </div>
            <div class="col">
                <a class="btn btn-primary button-size" href="/battle/battle.php">CAMBIA AVVERSARIO</a>
            </div>
            <div class="col">
                <a class="btn btn-primary button-size" href="/battle/">CAMBIA SQUADRA</a>
            </div>
        </div>
    </div>


</body>

</html>