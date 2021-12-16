# Alternative Security Options
Cybersecurity often puts complexity over usability. And because there aren't very good options available sometimes the security measures in place become stagnant.

## Demo
https://depperm.github.io/

- [![npm (scoped)](https://img.shields.io/badge/npm-2.2.0-green)](https://www.npmjs.com/package/webtotp) [webtotp](https://www.npmjs.com/package/webtotp)

### What
A variety of security alternatives beyond what is currently available. Included are a few examples I've made up

- Web TOTP: [TOTP](https://en.wikipedia.org/wiki/Time-based_One-Time_Password) without the device/app download
- Markov Diceware: combining markov chains and diceware to increase randomness

### Why
We as humanity have been reduced to using [dumb password rules](https://github.com/duffn/dumb-password-rules) which increase complexity and decreases usability. Or rules that enforce changing one's password after an arbitary period of time. Rules such as these are more of a security theater, making us feel safe but at the cost of [remembering confusing passwords](https://xkcd.com/936/). I believe there are better options. Even if none of these ideas ever gain traction, there are other options out there that would improve usability of passwords like:

- [zxcvbn](https://github.com/zxcvbn-ts/zxcvbn): a better password strength checker *almost all estimators of password strength are utter nonsense*<sup>[source](https://security.stackexchange.com/questions/208937/is-diceware-more-secure-than-a-long-passphrase#comment-420430)</sup>
- Android's 3x3 dot pattern password (initial version has 389,112 possibilities, but the grid could be expanded, dots could be allowed to be revisited, have no max length, etc to increase randomness)
- [Microsoft's picture](https://docs.microsoft.com/en-us/archive/blogs/b8/signing-in-with-a-picture-password?Redirected=true#comments) password (like passwords though they can be easy to guess, Microsoft came out with [article](https://docs.microsoft.com/en-us/archive/blogs/b8/optimizing-picture-password-security?Redirected=true) how to increase security)


### Password Security References

- [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html#sec5): National Institute of Standards and Technology (US)
    - password minimum length 8+
    - block/reject compromised/common/sequential passwords(see zxcvbn above or [haveibeenpwned](https://haveibeenpwned.com))
    - **ALL** characters allowed
- [NSC](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach): National Cyber Security Centre (UK)
    - encourage password manager use (generated passwords can be super complex)
    - encourage memorable password (3 word (diceware see above) or CVC-CVC-CVC format)
    - don't enforce complexity
    - block/reject compromised/common passwords (ditto of above)



