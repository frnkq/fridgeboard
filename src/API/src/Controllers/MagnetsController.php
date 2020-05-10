<?php

namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class MagnetsController
{
    private const MAGNETS_FILE_PATH = __DIR__ . '/../Files/magnets.json';

    public static function GetAll(Request $request, Response $response, $args)
    {
        $magnets  = self::_getMagnets();
        $payload = json_encode($magnets);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function GetSome(Request $request, Response $response, $args)
    {
        if (is_null($request->getParsedBody()))
            return $response->withStatus(400);
        if (!array_key_exists("ids", $request->getParsedBody()))
            return $response->withStatus(400);

        $ids = $request->getParsedBody()["ids"];
        $magnets  = self::_getMagnets();
        $returnMagnets = [];

        foreach ($magnets as $magnet) {
            foreach ($ids as $mid) {
                if ($magnet["id"] == $mid) {
                    array_push($returnMagnets, $magnet);
                }
            }
        }
        $payload = json_encode($returnMagnets);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function GetOne(Request $request, Response $response, $args)
    {
        $id = (int) $args["id"];
        $magnets = self::_getMagnets();
        $magnet = [];
        if (!is_null($magnets)) {
            foreach ($magnets as $m) {
                if ($m["id"] == $id) {
                    $magnet = $m;
                    break;
                }
            }
        }

        $payload = json_encode($magnet);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function Upsert(Request $request, Response $response, $args)
    {

        $magnetReq = $request->getParsedBody();
        $requiredFields = ["title", "content", "createdAt", "modifiedAt", "isPinned", "icon", "id", "category"];

        $invalid = false;
        foreach ($requiredFields as $requiredField) {
            if (!array_key_exists($requiredField, $magnetReq)) {
                $invalid = true;
                break;
            }
        }

        if (count(array_keys($magnetReq)) != count($requiredFields) || $invalid)
            return $response->withStatus(400);

        $magnetReq["id"] = !is_null($magnetReq["id"]) ? ($magnetReq["id"] == "" ? self::_newId() : $magnetReq["id"]) : self::_newId();

        self::_saveMagnet($magnetReq);

        $payload = json_encode($magnetReq);
        $response->getBody()->write($payload);
        return $response;
    }

    public static function Delete(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        $deletedMagnet = self::_deleteMagnet($id);

        $payload = json_encode($deletedMagnet);
        $response->getBody()->write($payload);

        return $response;
    }

    private static function _getMagnets()
    {
        $jsonContents = file_get_contents(self::MAGNETS_FILE_PATH);
        return json_decode($jsonContents, true);
    }

    private static function _deleteMagnet($id)
    {
        $magnets = self::_getMagnets();
        $index = self::_getIndexFromId($id);
        $deletedMagnet = [];
        if ($index != -1) {
            $deletedMagnet = $magnets[$index];
            unset($magnets[$index]);
        }
        self::_saveAllMagnets($magnets);
        return $deletedMagnet;
    }

    private static function _saveMagnet($magnet)
    {
        $magnets = self::_getMagnets();
        $magnets = is_null($magnets) ? [] : $magnets;
        $found = self::_getIndexFromId($magnet["id"]);
        if ($found != -1)
            $magnets[$found] = $magnet;
        else
            array_push($magnets, $magnet);

        self::_saveAllMagnets($magnets);
    }

    private static function _saveAllMagnets($magnets)
    {

        file_put_contents(self::MAGNETS_FILE_PATH, json_encode(array_values($magnets)));
    }


    private static function _newId()
    {
        $magnets = self::_getMagnets();
        if (!count($magnets))
            return 0;
        return ((int) $magnets[count($magnets) - 1]["id"]) + 1;
    }

    private static function _getIndexFromId($id)
    {
        $magnets = self::_getMagnets();
        $found = -1;
        if (!is_null($magnets)) {
            foreach ($magnets as $i => $m) {
                if ($m["id"] == $id) {
                    $found = $i;
                    break;
                }
            }
        }
        return $found;
    }
}
