<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="ma-2 about">
          <v-card-title>Overview</v-card-title>
          <v-container>
          	<v-expansion-panels multiple>
          		<v-expansion-panel>
          			<v-expansion-panel-header>History</v-expansion-panel-header>
          			<v-expansion-panel-content>
          				<v-timeline dense>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>1961</v-card-title>
          							<v-card-text>
          								<p>The introduction of the modern computer password is usually attributed to Fernando Corbató at MIT to ensure each researcher's individual files remained private.</p>

          								<p>Back then, Corbató considered the password a rudimentary security method. However, its utter simplicity paved the way for its popular adoption. So the password eventually became the long-term solution for maintaining computer security. It’s simple, it’s cost-effective, requires virtually no training, and can be propagated with ease.</p>
          							</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>1990s</v-card-title>
          							<v-card-text>
          								<p>Plenty of sensitive data was being stored in systems and online. Value moved online, and crime followed. Therefore, passwords also had to be more secure to protect sensitive data from being stolen and misused.</p>

          								<p>To achieve that goal, computer scientists turned to cryptology, and terms like “hashing” (developed by a cryptographer named Robert Morris Sr.) and “salting” were introduced as methods of making it more difficult to guess passwords.</p>
          							</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>2004</v-card-title>
          							<v-card-text>AOL data breach of 92 million records</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>2015</v-card-title>
          							<v-card-text>IRS data breach of 720 thousand records</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>2019</v-card-title>
          							<v-card-text>
          								<ul>
          									<li>Microsoft data breach of 250 million records</li>
          									<li>Facebook data breach of 267 + 540 million records</li>
          									<li>Capital One data breach of 106 million records</li>
          								</ul>
          							</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>2020</v-card-title>
          							<v-card-text>
          								<ul>
          									<li>Unknown (US Census Bureau?) data breach of 200 million records</li>
          									<li>Instagram data breach of 200 million records</li>
          								</ul>
          							</v-card-text>
          						</v-card>
          					</v-timeline-item>
          					<v-timeline-item>
          						<v-card>
          							<v-card-title>2021</v-card-title>
          							<v-card-text>
          								<ul>
          									<li>T-Mobile data breach of 25 million records</li>
          									<li>Apple data breach of 12 million records</li>
          									<li>AOL data breach of 20 million records</li>
          								</ul>
          							</v-card-text>
          						</v-card>
          					</v-timeline-item>
          				</v-timeline>
          				Source: <a href="https://gkaccess.com/history-of-the-password/#:~:text=The%20Evolution%20of%20the%20Password%201%20Historical%20roots.,Further%20developments.%20...%204%20Password%20best%20practices.%20">History of Password</a>, <a href="https://en.wikipedia.org/wiki/List_of_data_breaches#:~:text=List%20of%20data%20breaches%20%20%20%20Entity,%20%20hacked%20%2034%20more%20rows%20">Wikipedia: List of Data breaches</a>
          				<p>
          					This list is meant to show you why it's important to use good passwords. You never know when you're data might be exposed, so it's important to be as safe as possible.
          				</p>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          		<v-expansion-panel>
          			<v-expansion-panel-header>Security</v-expansion-panel-header>
          			<v-expansion-panel-content>
          				<p>Cybersecurity often puts complexity over usability. And because there aren't very good options available sometimes the security measures in place become stagnant.</p>
			            <h3>What is Security</h3>
			            <ul>
			            	<li><strong>What you have</strong> (RSA, OTP)</li>
			            	<li><strong>What you know</strong> (password)</li>
			            	<li><strong>What you are</strong> (biometrics)</li>
			            </ul>
			            <p>Passwords should be hashed when stored on the backend. A hash is:
			            <ul>
			            	<li><strong>Fixed length: No matter the input, the length of the hash is the same. (hash length abc == hash length supercalifragilisticexpialidoshish)</strong></li>
			            	<li><strong>Deterministic:</strong> The same input calculates the same hash (verify entered password matches)</li>
			            	<li><strong>Collision Resistant:</strong> A collision is when the same hash is generated for two different inputs. Better algorithms have lower collision probability. (hash of password1234 != hash password5678)</li>
			            	<li><strong>Unidirectional:</strong> Given a hash, there isn't any reasonable way to find out what the original piece of data was. (knowing hash != knowing password)</li>
			            </ul> a map of data from arbitray size to fixed-size values. If an account ever sends you the plaintext of your password get rid of your account and change any passwords that might match. <a href="http://web.archive.org/web/20130907182806/https://defuse.ca/password-policy-hall-of-shame.htm">Some sites known to store passwords as plaintext</a> or <a href="https://plaintextoffenders.com/about/">Plain Text Offenders</a></p>
			            <p>Restrictions on maximum length or content should be generally pointless. The reason for restrictions comes down to lazy and/or uneducated programmers/managers. Allowing more characters means more thought needs to be put in to avoid SQL injection or cross site scripting, but if passwords are just hashed this shouldn't be a concern.</p>
			            <div>
			            	Hashing example:
			            	<v-text-field v-model="password" label="Password"></v-text-field>
			            	<h3>MD5</h3>
			            	<div>{{md5}}</div>
			            	<h3>SHA1</h3>
			            	<div>{{sha1}}</div>
			            	<h3>SHA256</h3>
			            	<div>{{sha256}}</div>
			            	<h3>SHA512</h3>
			            	<div>{{sha512}}</div>
			            </div>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          		<v-expansion-panel>
          			<v-expansion-panel-header>Some Password Risks</v-expansion-panel-header>
          			<v-expansion-panel-content>
			            <ul>
			            	<li><strong>Phishing</strong>: social engineering to trick attempting to trick users into providing credentials to what they believe is a legitimate site</li>
			            	<li><strong>Keylogging</strong>: record keystrokes from keyboard</li>
			            	<li><strong>Brute force</strong>: Generally with data breaches passwords remain hashed (hopefully). Using a variety of methods malicious users can create passwords, hash them, and compare against leaked passwords until they find a match.</li>
			            	<li><strong>Local discover</strong>: password is seen where it is recorded or as it is typed in</li>
			            	<li><strong>Password Spraying</strong>: guessing common passwords</li>
			            </ul>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          		<v-expansion-panel>
          			<v-expansion-panel-header>Why Use Alternatives</v-expansion-panel-header>
          			<v-expansion-panel-content>
          				<p>We as humanity have been reduced to using <a href="https://github.com/duffn/dumb-password-rules" target="_blank">dumb password</a> rules which increase complexity and decreases usability. Or to use rules that enforce changing one's password after an arbitary period of time. Rules such as these are more of a security theater, making us feel safe but at the cost of <a href="https://xkcd.com/936/" target="_blank">remembering confusing passwords</a>. I believe there are better options. Even if none of these ideas ever gain traction, there are other options out there that can improve security:</p>
			            <ul>
			              <li><a href="https://github.com/zxcvbn-ts/zxcvbn" target="_blank">zxcvbn</a>: a better <strong>bad</strong> password meter that doesn't enforce dumb rules by default, almost all <i>strength</i> estimators are utter nonsense (<a href="https://security.stackexchange.com/questions/208937/is-diceware-more-secure-than-a-long-passphrase#comment-420430" target="_blank">source</a>) as they can only tell you what a <strong>bad</strong> password is, not necessarily what a good one is</li>
			              <li>Password manager (<a href="https://bitwarden.com" target="_blank">Bitwarden</a>, <a href="https://www.lastpass.com" target="_blank">LastPass</a>, <a href="https://www.cnet.com/tech/services-and-software/best-password-manager/" target="_blank">others</a>)</li>
			              <li>Diceware (see Markov Diceware for sources)</li>
			            </ul>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          		<v-expansion-panel>
          			<v-expansion-panel-header>References</v-expansion-panel-header>
          			<v-expansion-panel-content>
			            <ul>
			              <li><a href="https://pages.nist.gov/800-63-3/sp800-63b.html#sec5" target="_blank">NIST</a>: National Institute of Standards and Technology (US)
			              	<ul>
			              		<li>Password minimum length of 8 (no good reason to have upper limit < 512-there should be a limit so a 1MB password doesn't cause a DoS attack while hash computes)</li>
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
			              <li><a href="https://security.stackexchange.com/a/33471/156504">Why do some password requirements have low requirements?</a></li>
			            </ul>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          		<v-expansion-panel>
          			<v-expansion-panel-header>Terminology</v-expansion-panel-header>
          			<v-expansion-panel-content>
			            <ul>
			            	<li>hashing: Converting text string (no matter the length) into an encryped string of a fixed length. Algorithms:
			            		<ul>
			            			<li><strike>MD5:</strike> created 128-bit output and was a commonly used. Unfortunately, weaknesses in the algorithm started to surface, with most of the weaknesses manifesting themselves as collisions, thus MD5 started to be phased out.</li>
			            			<li>SHA-1: creates 160-bit output, fairly widespread use and acceptance</li>
			            			<li>SHA-2: collection of algorithms ranging from 224-512 bit output.</li>
			            		</ul>
			            	</li>
			            	<li>salt: random string appended/prepended to string pre hash to introduce randomness. Should be unique per user.</li>
			            </ul>
          			</v-expansion-panel-content>
          		</v-expansion-panel>
          	</v-expansion-panels>

            <h2>Problems/Risks</h2>
            <p>We can never be totally safe. No cybersecurity solution is permanent, so public policy must constantly evolve to suit the needs of its citizens in the cyber realm.</p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
	var crypto = require('crypto');

  export default {
    data: () => ({
    	password: 'password1234'
    }),
    computed: {
    	md5: function() {
    		return crypto.creatHash('md5').update(this.password).digest('hex');
    	},
    	sha1: function() {
    		return crypto.creatHash('sha21').update(this.password).digest('hex');
    	},
    	sha256: function() {
    		return crypto.creatHash('sha256').update(this.password).digest('hex');
    	},
    	sha512: function() {
    		return crypto.creatHash('sha512').update(this.password).digest('hex');
    	}
    }
  }
</script>
<style>
.about{
  text-align: left;
}
</style>
