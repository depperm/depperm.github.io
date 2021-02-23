# Web TOTP

## Site
https://depperm.github.io/

### What
A TOTP app that can be accessed anywhere you can access the internet without any extra apps installed.

### Why
- Lack of free totp implementations (users can use apps for free, but developers can't necessarily develop apps that use 2FA on the cheap to my knowledge)
- Most current 2FA methods require an app, extension, or hardware device (this has the downside of when you lose the hardware device or lose access to your device you can no longer use 2FA)

### Benefits
- Allow users to choose date (future/present)-near infite possibilities
- Allow user to choose own salt/secret
- Can implement different TOTP on multiple sites with the same tool
- Always have access to TOTP token generator (as long as internet and device)

### Potential Further Development
- npm package for server side testing
- service that developers could pay for with 3 options
  - get time
  - validate token
  - get token 

### Problems
- Need to test situations where user changes local time (and differs from server time), will this affect app time based token
- Password/salt and date still need to be stored server side, if there is a db dump/hack this info can be revealed and anyone can use your OTP

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
