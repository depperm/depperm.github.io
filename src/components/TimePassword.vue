<template>
  <v-container>
    <v-row class="text-center">
      <v-col col="12">
        <v-card class="ma-2 about">
          <v-card-title>Time Based Pin</v-card-title>
          <v-container>
            <h2>What</h2>
            <p>A pin calculated from the time and a preset equation</p>
            <h2>Why Use</h2>
            <ul>
              <li>One's password can evolve with time without the user having to change it.</li>
              <li>Can't be solved by keylogging pin (at least not easily)</li>
              <li>Obscurity?</li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Each pin can have individual equations-infinite possibilities</li>
              <li>Pasword is based on time-infinite possibilities</li>
            </ul>
            <h2>Problems/Risks</h2>
            <ul>
              <li>More complex 'time passwords' are:
                <ul>
                  <li>Harder to remember</li>
                  <li>May require calculator (possible to make a RSA token like device with personalized equation?)</li>
                  <li>Time consuming to compute/solve, potential need to recalculate pin if the time changes
                    <ul>
                      <li>A solution that only uses minute variables towards the end of one's pin, which would reduce this risk, makes pins more predictable, lowers randomness
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Pin equation needs to be stored server side, if there is a db dump/hack this info can in theory be revealed (has to be decrypted) and anyone can generate your pin on the leaked site</li>
              <li>Generic dangers
                <ul>
                  <li><s>key logging</s>(caveat is the initial equation can be, simple equations can be reverse engineered)</li>
                  <li>phished info?(should in theory be harder for someone to phish for equations)</li>
                  <li><s>over shoulder spied</s>(caveat same as above)</li>
                </ul>
              </li>
            </ul>
            <h2>Further Development</h2>
            <ul>
              <li>NPM</li>
              <li>Better server side security solution</li>
              <li>More robust math language(power, log, pi, trig?)</li>
              <li>Browser extension</li>
              <li>PWA</li>
            </ul>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-card-title>Pin Language</v-card-title>
          <v-container>
            Time Variables:
            <pre>
              Military Time    Standard Time
              AB:EF            CD:EF
              HH:MM            HH:MM AM/PM

              Date
              GH/IJ/KLMN
              MM/DD/YYYY
            </pre>
            Language:
            <pre>
              PIN = EQ (,EQ)*
              EQ  = (EQ OP EQ) | A-N | NUM
              OP  = + | - | / | * | %
              NUM = integer
            </pre>
            Rules:
            <ul>
              <li>The absolute value will always be returned</li>
              <li>Any answer will be rounded to the nearest integer</li>
            </ul>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-card-title>Pin Equation</v-card-title>
          <v-container>
            <v-text-field v-model="equation" label="Equation" title="See grammar above" @keyup="checkEquation()"></v-text-field>
            <span v-if="invalidEquation"></span>
            <v-btn depressed color="primary" @click="resetEquation()">
              Reset
            </v-btn>
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
  import EQ from "../common/Equation.js";

  export default {

    data: () => ({
      equation: '(A+B), (C-D), ((A * B) % 10), D',
      invalidEquation: false,
      error: '',
      pins: []
      // showSalt: false,
      // tokenSalt: '',
      // showDatePicker: false,
      // tokenDate: (new Date('1970-1-1')).toISOString().substring(0,10),
      // tokenLength: 6,
      // tokenLengths: [6,7,8],
      // hashType: 'SHA1',
      // hashTypes: ['SHA1','SHA256','SHA512'],
      // token: 'XXXXXX',
      // prevToken: 'XXXXXX',
      // testToken: '',
      // timeUntilChange: .25,
      // generator: null,
      // tokenTime: 30,
      // tokenTimes: [30,45,60],
      // validateResult:''
    }),
    created(){
      // this.generator = setInterval(()=>this.generateTOTP(), 1000);
    },
    computed: {
      // timeUntilChangePercent:function(){
      //   return Math.round(this.timeUntilChange * this.tokenTime)
      // }
    },
    methods: {
      resetEquation(){
        this.equation = '(A+B), (C-D), ((A * B) % 10), D'
      },
      checkEquation(){
        try{
          this.pins = this.equation.split(/,\s*/).map(p => new EQ(p))
          pins.forEach((pin, idx) => {
            console.log(pin.toString(), pin.value())
          })
          this.invalidEquation=false
        }catch(e){
          this.invalidEquation=true
          this.error=e
        }
      }
      // generateTOTP(){
      //   let gen = webtotp.webtotp(new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
      //   let gen2 = webtotp.webtotp(new Date((new Date(this.tokenDate)).getTime() + (this.tokenTime * 1000)), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
      //   this.token = gen.token
      //   this.prevToken = gen2.token
      //   this.timeUntilChange = gen.timeUntilChange

      //   this.validateResult = webtotp.validate(this.testToken, new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength) ? 'VALID' : 'INVALID'
      // }
    }
  }
</script>
<style>
.about{
  text-align: left;
}
</style>
