<?php
require_once '../src/vendor/autoload.php';

use App\Controllers\PagesGetController;
use App\Controllers\PagesPostController;

session_start();

$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

require '../src/container.php';

$container = $app->getContainer();

// Middlewares
$app->add(new \App\Middlewares\FlashMiddleware($container->view->getEnvironment()));

// Routes
$app->group('', function() {
    // Route : Page accueil (GET)
    $this->get('/', PagesGetController::class . ':accueil')->setName('accueil');

    // Route : Page blog (GET)
    $this->get('/blog', PagesGetController::class . ':blog')->setName('blog');

    // Route : Page contact (GET)
    $this->get('/contact', PagesGetController::class . ':contact')->setName('contact');
});

$app->run();
