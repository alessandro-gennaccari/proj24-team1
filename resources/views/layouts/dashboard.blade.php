<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>@yield('title', 'dashboard')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}"> 
</head> 
<body> 
    <nav>
        <ul>
            <li><a href="">dashboard</a></li>
            <li><a href="{{Route('flat.index')}}">flats</a></li>
            <li><a href="">messagges</a></li>
            <li><a href="">ads</a></li>
            <li><a href="">settings</a></li>

        </ul>
    </nav>

    <main>@yield('content')</main>
</body> 
</html> 