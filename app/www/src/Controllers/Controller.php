<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface;

class Controller {

    private $container;

    public function __construct($container)
    {
        $this->container = $container;
    }

    public function __get($name) {
        return $this->container->get($name);
    }

    public function render(ResponseInterface $response, $file, $params = []) {
        $this->container->view->getEnvironment()->addGlobal('currentUrl', $params['route_name']);
        $this->container->view->render($response, $file, $params);
    }

    public function redirect($response, $name, $args = []) {
        return $response->withStatus(200)->withHeader('Location', $this->router->pathFor($name, $args));
    }

    public function flash($message, $type = 'success') {
        if(!isset($_SESSION['flash'])) {
            $_SESSION['flash'] = [];
        }
        return $_SESSION['flash'][$type] = $message;
    }

}
