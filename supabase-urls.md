# Supabase Configuration URLs

## Site URL
```
https://fitbuddy-login-free-5exp.bolt.host
```

## Redirect URLs
```
https://fitbuddy-login-free-5exp.bolt.host/auth/callback
https://fitbuddy-login-free-5exp.bolt.host/auth/confirm
https://fitbuddy-login-free-5exp.bolt.host/**
```

## Additional URLs (if needed)
```
https://fitbuddy-login-free-5exp.bolt.host/auth/reset-password
https://fitbuddy-login-free-5exp.bolt.host/auth/update-password
```

## Instructions for Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Set the **Site URL** to: `https://fitbuddy-login-free-5exp.bolt.host`
4. Add the following **Redirect URLs**:
   - `https://fitbuddy-login-free-5exp.bolt.host/auth/callback`
   - `https://fitbuddy-login-free-5exp.bolt.host/auth/confirm`
   - `https://fitbuddy-login-free-5exp.bolt.host/**` (wildcard for all routes)

## Notes
- The wildcard URL (`/**`) allows authentication from any route on your domain
- Make sure to save the configuration in your Supabase dashboard
- These URLs are based on your current Bolt hosting deployment