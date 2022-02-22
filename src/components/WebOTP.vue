<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="ma-2 about">
          <v-card-title>Web TOTP</v-card-title>
          <v-container>
            <h2>What</h2>
            <p>A TOTP app that can be accessed anywhere you can access the internet without any extra apps installed.</p>
            <h2>Why Use</h2>
            <ul>
              <li>Most current 2FA(TOTP) methods require an app(authenticator), extension(sometimes browser dependant), or hardware device(RSA token) (this has the downside of when you lose the hardware device or lose access to your device you can no longer use 2FA)</li>
              <li>Lack of free totp implementations (users can use apps for free, but developers can't necessarily develop apps that use 2FA on the cheap to my knowledge)</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Allow users to choose date (future/present)-infinite possibilities</li>
              <li>Allow user to choose own secret (or have domain specific)-infinite possibilities</li>
              <li>Can implement different TOTP on multiple sites with the same tool</li>
              <li>Always have access to TOTP token generator (as long as internet, but don't need a personal device)</li>
            </ul>
            <h2>Problems/Risks</h2>
            <ul>
              <li>Need to test situations where user changes local time (and differs from server time), will this affect app/client time based token
                <ul>
                  <li>A easy solution for this is for apps that implement their own front end tool to get the server date on load and check against local time.</li>
                </ul>
              </li>
              <li>Secret and date still need to be stored server side, if there is a db dump/hack this info can in theory be revealed (has to be decrypted) and anyone can generate your TOTP on the leaked site
                <ul>
                  <li>I believe this is a risk of other OTP</li>
                </ul>
              </li>
              <li>DoS possibility on public TOTP sites to deny users access to TOTP generator (not much risk if domain hosted or if various DoS protections are in place)
              </li>
              <li>Generic dangers
                <ul>
                  <li><s>key logging<s>?</li>
                  <li>phished info</li>
                  <li>local discovery</li>
                </ul>
              </li>
            </ul>
            <h2>Further Development</h2>
            <ul>
              <li>Better front end use case examples</li>
              <li>Browser extension</li>
              <li>PWA</li>
              <li>Paid options
                <ul>
                  <li>get time (for synchronization)</li>
                  <li>get/validate token</li>
                </ul>
              </li>
            </ul>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-card-title>Token Gen Settings 1.0</v-card-title>
          <v-container>
            <v-menu
              ref="showDatePicker"
              v-model="showDatePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tokenDate"
                  label="Token date"
                >
                  <v-icon slot="append"
                    v-bind="attrs"
                    v-on="on">mdi-calendar</v-icon>
                </v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="tokenDate"
                @input="showDatePicker = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="tokenSalt"
              :append-icon="showSalt ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showSalt ? 'text' : 'password'"
              name="input-10-1"
              label="Token Secret"
              @click:append="showSalt = !showSalt"
            ></v-text-field>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Extra Options</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-select :items="tokenLengths" v-model="tokenLength" label="Token Length"></v-select>
                  <v-select :items="hashTypes" v-model="hashType" label="Hash Type"></v-select>
                  <v-select :items="tokenTimes" v-model="tokenTime" label="Token Period"></v-select>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-container>
            <span>Prev Token {{prevToken}}  </span>
            ......
            <span><b>Token {{token}}</b></span>
            
            <br/>
            <v-progress-circular :size="100" :width="15" color="green" :value="timeUntilChange*100">
              {{Math.round(tokenTime-timeUntilChangePercent)}}
              <br/>
              sec
            </v-progress-circular> until change
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-container>
            <span>Allows current and the last token value to be validated</span>
            <v-text-field label="Test TOTP Validate" v-model="testToken"/>
            <span>{{validateResult}}</span>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // import {webtotp, validate} from 'webtotp'
  const webtotp = require('webtotp')

  export default {

    data: () => ({
      showSalt: false,
      tokenSalt: '',
      showDatePicker: false,
      tokenDate: (new Date('1970-1-1')).toISOString().substring(0,10),
      tokenLength: 6,
      tokenLengths: [6,7,8],
      hashType: 'SHA1',
      hashTypes: ['SHA1','SHA256','SHA512'],
      token: 'XXXXXX',
      prevToken: 'XXXXXX',
      testToken: '',
      timeUntilChange: .25,
      generator: null,
      tokenTime: 30,
      tokenTimes: [30,45,60],
      validateResult:''
    }),
    created(){
      this.generator = setInterval(()=>this.generateTOTP(), 1000);
    },
    computed: {
      timeUntilChangePercent:function(){
        return Math.round(this.timeUntilChange * this.tokenTime)
      }
    },
    methods: {
      generateTOTP(){
        let gen = webtotp.webtotp(new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
        let gen2 = webtotp.webtotp(new Date((new Date(this.tokenDate)).getTime() + (this.tokenTime * 1000)), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
        this.token = gen.token
        this.prevToken = gen2.token
        this.timeUntilChange = gen.timeUntilChange

        this.validateResult = webtotp.validate(this.testToken, new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength) ? 'VALID' : 'INVALID'
      }
    }
  }
</script>
<style>
.about{
  text-align: left;
}
</style>
