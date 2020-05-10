<?php
use Slim\Factory\AppFactory;
use Middleware\JsonBodyParserMiddleware;
use Middleware\JsonResponseMiddleware;
use Slim\Exception\HttpNotFoundException;
require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->add(\Middleware\CORSMiddleware::class);

$app->add(JsonBodyParserMiddleware::class);
$app->add(JsonResponseMiddleware::class);

$app->options('/{route:.+}', function ($request, $response, $args){
    return $response->withHeader("Access-Control-Allow-Origin", '*');
});

$magnetRoutes = require __DIR__ . '/src/Routes/MagnetRoutes.php';
$magnetRoutes($app);

$categoriesRoutes = require __DIR__ . '/src/Routes/CategoriesRoutes.php';
$categoriesRoutes($app);




$app->run();