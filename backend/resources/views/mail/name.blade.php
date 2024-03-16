<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm email address</title>
</head>
<body>
    <div>
        <h1>Confirm email address</h1>
        <p>Hello {{ $user->name }}</p>
        <p>Please click below button to verify your email address</p>
        <a href="{{ URL::temporarySignedRoute('verification.verify', now()->addMinutes(30), ['id' => $user->id]) }}">
            Verify Email Address
       </a>
    </div>
</body>
</html>
