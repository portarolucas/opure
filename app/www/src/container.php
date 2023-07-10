<?php
$container = $app->getContainer();

$container['view'] = function($container) {
    $dir = dirname(__DIR__);
    $view = new \Slim\Views\Twig($dir . '/src/Views', [
        // 'cache' => $dir . '/tmp/cache'
    ]);

    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new \Slim\Views\TwigExtension($container['router'], $basePath));

    return $view;
};