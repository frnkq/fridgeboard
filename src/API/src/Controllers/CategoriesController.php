<?php

namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CategoriesController
{
    private const MAGNETS_FILE_PATH = __DIR__ . '/../Files/categories.json';

    public static function GetAll(Request $request, Response $response, $args)
    {
        $categories  = self::_getCategories();
        $payload = json_encode($categories);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function GetSome(Request $request, Response $response, $args)
    {
        if(is_null($request->getParsedBody()))
            return $response->withStatus(400);
        if(!array_key_exists("ids", $request->getParsedBody()))
            return $response->withStatus(400);

        $ids = $request->getParsedBody()["ids"];
        $categories  = self::_getCategories();
        $returnCategories = [];

        foreach($categories as $category)
        {
            foreach($ids as $mid)
            {
                if($category["id"] == $mid)
                {
                    array_push($returnCategories, $category);
                }
            }
        }
        $payload = json_encode($returnCategories);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function GetOne(Request $request, Response $response, $args)
    {
        $id = (int) $args["id"];
        $categories = self::_getCategories();
        $category = [];
        foreach ($categories as $m) {
            if ($m["id"] == $id) {
                $category = $m;
                break;
            }
        }

        $payload = json_encode($category);

        $response->getBody()->write($payload);
        return $response;
    }

    public static function Upsert(Request $request, Response $response, $args)
    {

        $categoryReq = $request->getParsedBody();
        $requiredFields = ["id", "name", "magnetsIds", "icon"];

        $invalid = false;
        foreach ($requiredFields as $requiredField) {
            if (!array_key_exists($requiredField, $categoryReq)) {
                $invalid = true;
                break;
            }
        }

        if (count(array_keys($categoryReq)) != count($requiredFields) || $invalid)
            return $response->withStatus(400);

        $categoryReq["id"] = !is_null($categoryReq["id"]) ? ($categoryReq["id"] == "" ? self::_newId() : $categoryReq["id"]) : self::_newId();

        self::_saveCategory($categoryReq);

        $payload = json_encode($categoryReq);
        $response->getBody()->write($payload);
        return $response;
    }
    public static function AddMagnet(Request $request, Response $response, $args)
    {
        if(is_null($args))
        {
            return $response->withStatus(400);
        }
        if(!(array_key_exists("catId", $args) && array_key_exists("magnetId", $args) ))
        {
            return $response->withStatus(400);
        }
        
        $categories = self::_getCategories();
        $index = self::_getIndexFromId($args["catId"]);

        if(array_key_exists($index, $categories))
        {
            array_push($categories[$index]["magnetsIds"], (int)$args["magnetId"]);
            self::_saveAllCategories($categories);
        }

        $payload = json_encode($categories[$index]);
        $response->getBody()->write($payload);
        return $response;
    }

    public static function RemoveMagnet(Request $request, Response $response, $args)
    {
        if(is_null($args))
        {
            return $response->withStatus(400);
        }
        if(!(array_key_exists("catId", $args) && array_key_exists("magnetId", $args) ))
        {
            return $response->withStatus(400);
        }
        
        $categories = self::_getCategories();
        $index = self::_getIndexFromId($args["catId"]);

        if(array_key_exists($index, $categories))
        {
            
            $magnetId = (int)$args["magnetId"];
            $ids = $categories[$index]["magnetsIds"];
            $found = -1;
            foreach($categories[$index]["magnetsIds"] as $i=>$mId)
            {
                if($magnetId == $mId)
                {
                    $found = $i;
                    break;
                }
            }
            unset($categories[$index]["magnetsIds"][$found]);
            self::_saveAllCategories($categories);
        }

        $payload = json_encode($categories[$index]);
        $response->getBody()->write($payload);
        return $response;
    }

    public static function Delete(Request $request, Response $response, $args)
    {
        $id = $args["id"];
        $deletedCategory = self::_deleteCategory($id);

        $payload = json_encode($deletedCategory);
        $response->getBody()->write($payload);

        return $response;
    }

    private static function _getCategories()
    {
        $jsonContents = file_get_contents(self::MAGNETS_FILE_PATH);
        return json_decode($jsonContents, true);
    }

    private static function _deleteCategory($id)
    {
        $categories = self::_getCategories();
        $index = self::_getIndexFromId($id);
        $deletedCategory = [];
        if ($index != -1) {
            $deletedCategory = $categories[$index];
            unset($categories[$index]);
        }
        self::_saveAllCategories($categories);

        return $deletedCategory;
    }

    private static function _saveCategory($category)
    {
        $categories = self::_getCategories();
        $categories = is_null($categories) ? [] : $categories;
        $found = self::_getIndexFromId($category["id"]);
        if ($found != -1)
            $categories[$found] = $category;
        else
            array_push($categories, $category);

        self::_saveAllCategories($categories);
    }

    private static function _saveAllCategories($categories)
    {
        file_put_contents(self::MAGNETS_FILE_PATH, json_encode(array_values($categories)));
    }


    private static function _newId()
    {
        $categories = self::_getCategories();
        if (is_null($categories))
            return 0;
        return ((int) $categories[count($categories) - 1]["id"]) + 1;
    }

    private static function _getIndexFromId($id)
    {
        $categories = self::_getCategories();
        $found = -1;
        if (!is_null($categories)) {
            foreach ($categories as $i => $m) {
                if ($m["id"] == $id) {
                    $found = $i;
                    break;
                }
            }
        }
        return $found;
    }
}
