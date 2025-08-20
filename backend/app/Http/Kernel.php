<?php

namespace App\Http;

use App\Http\Middleware\Authenticate;
use App\Http\Middleware\AuthorizeMiddleware;
use App\Http\Middleware\FileUploader;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\TrimStrings;
use App\Http\Middleware\TrustProxies;
use App\Http\Middleware\ValidateSignature;
use Illuminate\Auth\Middleware\AuthenticateWithBasicAuth;
use Illuminate\Auth\Middleware\Authorize;
use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Foundation\Http\Middleware\ValidatePostSize;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Middleware\SetCacheHeaders;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Session\Middleware\AuthenticateSession;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        TrustProxies::class,
        HandleCors::class,
        PreventRequestsDuringMaintenance::class,
        ValidatePostSize::class,
        TrimStrings::class,
        ConvertEmptyStringsToNull::class,
    ];
    protected $routeMiddleware = [
        // Other middleware definitions
        'permission' => AuthorizeMiddleware::class,
        'fileUploader' => FileUploader::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'user' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'permission' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'role' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'role-permission' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'setting' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'account' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'transaction' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'designation' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'files' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'email-config' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'email' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'dashboard' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'report' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "page-size" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        
        "shift" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "education" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "department" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "designation-history" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "employment-status" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "salary-history" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "award" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "award-history" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        "announcement" => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'currency' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'payment-method' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'manual-payment' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'terms-and-condition' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'media' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'sale-commission' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'payment-sale-commission' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'quick-link' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        //hrm
        'hrm-dashboard' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'public-holiday' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'weekly-holiday' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'priority' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'leave-policy' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'leave-application' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'attendance' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'project' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'milestone' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'tasks' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'task-status' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'project-team' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'payroll' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-category' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-type' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-location' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-skills' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-workExperience' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-application' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-interview' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'job-applicationStatus' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'note' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
        'attachment' => [
            ThrottleRequests::class,
            SubstituteBindings::class,
        ],
    ];

    /**
     * The application's middleware aliases.
     *
     * Aliases may be used instead of class names to conveniently assign middleware to routes and groups.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        'auth' => Authenticate::class,
        'auth.basic' => AuthenticateWithBasicAuth::class,
        'auth.session' => AuthenticateSession::class,
        'cache.headers' => SetCacheHeaders::class,
        'can' => Authorize::class,
        'guest' => RedirectIfAuthenticated::class,
        'password.confirm' => RequirePassword::class,
        'precognitive' => HandlePrecognitiveRequests::class,
        'signed' => ValidateSignature::class,
        'throttle' => ThrottleRequests::class,
        'verified' => EnsureEmailIsVerified::class,
    ];
}
