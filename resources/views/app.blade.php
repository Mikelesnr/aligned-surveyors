<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Aligned Surveyors | Professional Land Surveying Services Zimbabwe</title>
        <meta name="description" content="Aligned Surveyors offers high-precision land surveying, engineering surveys, topographic mapping, and cadastral solutions for infrastructure and property development projects across Zimbabwe.">
        <meta name="keywords" content="land survey companies in zimbabwe, professional land surveyors harare, cadastral surveys zimbabwe, topographic mapping harare, engineering surveyors zimbabwe, site set out services, boundary verification zimbabwe, surveying firms harare, surveyors in harare, Surveyors in mutare, top surveyors in harare zimbabwe, diverse surveyors in zimbabwe, drone pilots surveyors, mine surveyors in zimbabwe, hydrographic surveyors zimbabwe, construction surveyors zimbabwe, geodetic surveyors zimbabwe, land subdivision surveyors zimbabwe, topographic surveyors zimbabwe, boundary surveyors zimbabwe, engineering surveyors zimbabwe, cadastral surveyors zimbabwe, property surveyors zimbabwe, topographic mapping services zimbabwe, land surveying services zimbabwe, professional land surveying companies in harare, accurate land surveys in zimbabwe, reliable land surveying firms in harare">
        <meta name="robots" content="index, follow">
        <meta name="language" content="English">
        <meta name="author" content="Michael Mwanza">
        <meta name="designer" content="Michael Mwanza">
        <meta name="developer" content="Michael Mwanza">
        <link rel="author" href="https://michaelmwanza.site">

        <meta name="author" content="Kuzivakwashe Kennedy Nyandoro">
        <meta property="og:profile:first_name" content="Kuzivakwashe Kennedy">
        <meta property="og:profile:last_name" content="Nyandoro">
        <meta property="og:profile:username" content="kuzivakwashe-kennedy-nyandoro-3b827a93">

        <meta property="og:type" content="website">
        <meta property="og:url" content="https://alignedsurveyors.co.zw/">
        <meta property="og:title" content="Aligned Surveyors | Precision Land Surveying & Mapping">
        <meta property="og:description" content="Professional land surveying, engineering layouts, and geomatics solutions tailored for residential, commercial, and engineering projects across Zimbabwe.">
        <meta property="og:image" content="https://alignedsurveyors.co.zw/images/logo.png">

        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://alignedsurveyors.co.zw/">
        <meta property="twitter:title" content="Aligned Surveyors | Professional Surveying Services">
        <meta property="twitter:description" content="Accurate terrain mapping, subdivision layouts, and structural staking solutions in Zimbabwe.">
        <meta property="twitter:image" content="https://alignedsurveyors.co.zw/images/logo.png">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- PWA + Icon Links -->
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
        <link rel="manifest" href="/images/site.webmanifest">
        <script src="https://meet.jit.si/external_api.js" defer></script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
