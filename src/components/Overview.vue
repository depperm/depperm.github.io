<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="ma-2 about">
          <v-card-title>Overview</v-card-title>
          <v-container>
            <p>Cybersecurity often puts complexity over usability. And because there aren't very good options available sometimes the security measures in place become stagnant.</p>
            <h2>What is Security</h2>
            <ul>
            	<li><strong>What you have</strong> (RSA, OTP)</li>
            	<li><strong>What you know</strong> (password)</li>
            	<li><strong>What you are</strong> (biometrics)</li>
            </ul>
            <h2>Why Use Alternatives</h2>
            <p>We as humanity have been reduced to using <a href="https://github.com/duffn/dumb-password-rules" target="_blank">dumb password</a> rules which increase complexity and decreases usability. Or to use rules that enforce changing one's password after an arbitary period of time. Rules such as these are more of a security theater, making us feel safe but at the cost of <a href="https://xkcd.com/936/" target="_blank">remembering confusing passwords</a>. I believe there are better options. Even if none of these ideas ever gain traction, there are other options out there that would improve usability of passwords like:</p>
            <ul>
              <li><a href="https://github.com/zxcvbn-ts/zxcvbn" target="_blank">zxcvbn</a>: a better <strong>bad</strong> password meter that doesn't enforce dumb rules by default, almost all <i>strength</i> estimators are utter nonsense (<a href="https://security.stackexchange.com/questions/208937/is-diceware-more-secure-than-a-long-passphrase#comment-420430" target="_blank">source</a>)</li>
            </ul>
            <h2>References</h2>
            <ul>
              <li><a href="https://pages.nist.gov/800-63-3/sp800-63b.html#sec5" target="_blank">NIST</a>: National Institute of Standards and Technology (US)
              	<ul>
              		<li>Password minimum length of 8</li>
              		<li>Block/reject compromised/common/sequential passwords (see zxcvbn above or <a href="https://haveibeenpwned.com/" target="_blank">haveibeenpwned</a>)</li>
              		<li><strong>ALL</strong> characters allowed</li>
              		<li><a href="https://www.nist.gov/publications/zero-trust-architecture" target="_blank">Zero Trust</a></li>
              	</ul>
              </li>
              <li><a href="https://www.ncsc.gov.uk/collection/passwords/updating-your-approach" target="_blank">NSC</a>: National Cyber Security Centre (UK)
              	<ul>
              		<li>Encourage password manager use (generated passwords can be super complex)</li>
              		<li>Encourage memorable passwords (3 word diceware or CVC-CVC-CVC format)</li>
              		<li>Don't enforce complexity</li>
              		<li>Block/reject compromised/common passwords (see above)</li>
              	</ul>
              </li>
            </ul>
            <h2>Problems/Risks</h2>
            <p>We can never be totally safe. No cybersecurity solution is permanent, so public policy must constantly evolve to suit the needs of its citizens in the cyber realm.</p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    data: () => ({
    })
  }
</script>
<style>
.about{
  text-align: left;
}
</style>
