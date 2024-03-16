<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body>
    <div>
        <h1>Reset Password</h1>
        <p>Hello {{ $user->name }},</p>
        <p>Please click the button below to reset your password.</p>
        <a href="ebnb.essential.ng/forgot-password/{{ $token }}">
            Reset Password
        </a>
    </div>
</body>
</html>
