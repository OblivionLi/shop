@component('mail::message')
# Forgot Password Notification

Hello, {{ $user->name }}. A request was called to reset the password on this email {{ $user->email }}.

If you didn't request password reset please ignore this email.

To reset your account password, click on the link below.

@component('mail::button', ['url' => 'http://127.0.0.1:8000/reset-password/' . $token])
Reset Password
@endcomponent 

Thanks,<br>
{{ config('app.name') }}
@endcomponent