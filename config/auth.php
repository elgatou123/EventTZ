<?php

return [

    'defaults' => [
        'guard' => 'api', // Utiliser l'API par défaut pour Sanctum
        'passwords' => 'utilisateurs',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'utilisateurs',
        ],

        'api' => [
            
            'driver' => 'sanctum', // Si vous utilisez Laravel Sanctum
            'provider' => 'utilisateurs',
        ],
    ],

    'providers' => [
        'utilisateurs' => [
            'driver' => 'eloquent',
            'model' => App\Models\Utilisateur::class, // Votre modèle personnalisé
        ],
    ],

    'passwords' => [
        'utilisateurs' => [
            'provider' => 'utilisateurs',
            'table' => 'password_resets',
            'expire' => 60, // minutes de validité du token
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
