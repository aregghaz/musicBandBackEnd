<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\LocaleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Add LocaleMiddleware to web middleware group
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            LocaleMiddleware::class, // Added locale middleware
        ]);

        // Register alias for admin middleware
        $middleware->alias([
            'admin' => AdminMiddleware::class,
//            'locale' => LocaleMiddleware::class, // Optional: if you want to use it as route middleware
        ]);

        // If you need to add it to the global middleware stack instead:
        // $middleware->use([
        //     LocaleMiddleware::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Your existing exception handling
    })
    ->create();
