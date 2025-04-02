<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $availableLocales = config('app.available_locales', ['en' => 'English']);


        $locale = $request->route('locale') ??
            Session::get('locale') ??
            $request->getPreferredLanguage(array_keys($availableLocales)) ??
            config('app.fallback_locale');


        if (!array_key_exists($locale, $availableLocales)) {
            $locale = config('app.fallback_locale');
        }

        App::setLocale($locale);
        Session::put('locale', $locale);


        Inertia::share(['locale' => $locale]);

        return $next($request);
    }
}

