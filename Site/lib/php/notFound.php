<?php
function sendError($msg) {
    echo '<body><br><div class="">'.
    '</div><div class="container">'.
    '<h1>ERROR 404:</h1><hr>' .$msg. '</div></body></html>';
}