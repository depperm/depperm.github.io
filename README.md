# Web TOTP
An example implementation of [webtotp](https://github.com/depperm/webtotp)

## Live Version
https://depperm.github.io/

### What
A TOTP app that can be accessed anywhere you can access the internet without any extra apps installed.

### Why
- Most current 2FA methods require an app, extension, or hardware device (this has the downside of when you lose the hardware device or lose access to your device you can no longer use 2FA)
- Lack of free totp implementations (users can use apps for free, but developers can't necessarily develop apps that use 2FA on the cheap to my knowledge)

### Benefits
- Allow users to choose date (future/present)-infite possibilities
- Allow user to choose own secret-infite possibilities
- Can implement different TOTP on multiple sites with the same tool
- Always have access to TOTP token generator (as long as internet, but don't need a personal device)

### Potential Further Development
- service that developers could pay for (tiers for usage) with 3 options
  - get time
  - validate token
  - get token 

### Problems
- Need to test situations where user changes local time (and differs from server time), will this affect app time based token
  - A easy solution for this is for apps that implement their own front end tool to get the server date on load and check against local time.
- Secret and date still need to be stored server side, if there is a db dump/hack this info can in theory be revealed (has to be decrypted) and anyone can generate your TOTP on the leaked site
- DoS possibility on public TOTP sites to deny users access to TOTP generator
- Generic dangers
  - key logging
  - phished info
  - copied info visually/over shoulder
  - entering critical info on a third party site (all the code is available to peruse to hopefully ease worries, also this is meant to be an example/prototype only) 
