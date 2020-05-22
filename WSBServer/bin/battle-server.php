<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Server\BattleServerInterface;

    require dirname(__DIR__) . '/vendor/autoload.php';

    $wsServer = new WsServer(
        new BattleServerInterface()
    );

    $server = IoServer::factory(
        new HttpServer(
            $wsServer
        ),
        8080
    );

    $wsServer->enableKeepAlive($server->loop,30);

    echo "Server started!\n";

    $server->run();