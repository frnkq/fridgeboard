<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;
use Controllers\MagnetsController;
use Middleware\JsonResponseMiddleware;

return function (App $app) {
    $app->group('/magnets', function (RouteCollectorProxy $group) {
        $group->get('/all', MagnetsController::class . ':GetAll');
        $group->post('/some', MagnetsController::class . ':GetSome');
        $group->get('/{id}', MagnetsController::class . ':GetOne');
        $group->post('/upsert', MagnetsController::class . ':Upsert');
        $group->post('/delete/{id}', MagnetsController::class . ':Delete');
    });
};
