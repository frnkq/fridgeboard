<?php
namespace Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class CORSMiddleware
{

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $response = $handler->handle($request);
        $response = $response
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, content-type')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
          ->withHeader('Access-Control-Allow-Origin', '*');

        $httpOrigin = "";
        if(isset($_SERVER['HTTP_ORIGIN']))
        {
            $httpOrigin = $_SERVER['HTTP_ORIGIN'];
        }
        else
        {
            if(isset($_SERVER['HTTP_REFERER']))
            {
                $httpOrigin = $_SERVER['HTTP_REFERER'];
            }
        }

        $allowedDomains = ["http://localhost:4200", "http://192.168.1.103:4200"];
        if(in_array($httpOrigin, $allowedDomains))
        {
            $response = $response->withHeader('Access-Control-Allow-Origin', $httpOrigin); 
        }
        return $response;
    }
}
