<?php

use Controllers\CategoriesController;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    $app->group('/categories', function (RouteCollectorProxy $group) {
        $group->get('/all', CategoriesController::class . ':GetAll');
        $group->post('/some', CategoriesController::class . ':GetSome');
        $group->get('/{id}', CategoriesController::class . ':GetOne');
        $group->post('/upsert', CategoriesController::class . ':Upsert');
        $group->post('/addMagnet/{catId}/{magnetId}', CategoriesController::class . ':AddMagnet');
        $group->post('/removeMagnet/{catId}/{magnetId}', CategoriesController::class . ':RemoveMagnet');
        $group->post('/delete/{id}', CategoriesController::class . ':Delete');
    });
};
