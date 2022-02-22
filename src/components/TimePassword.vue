<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
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
              <li>Password is based on time-infinite possibilities</li>
            </ul>
            <h2>Problems/Risks</h2>
            <ul>
              <li>More complex 'time passwords' are:
                <ul>
                  <li>Harder to remember</li>
                  <li>May require calculator (possible to make a RSA token like device with personalized equation?)</li>
                  <li>Time consuming to compute/solve, potential need to recalculate pin if the time changes
                    <ul>
                      <li>A solution that only uses minute variables towards the end of one's pin, which would reduce this risk, makes pins more predictable, lowers randomness</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Pin equation needs to be stored server side, if there is a db dump/hack this info can in theory be revealed (has to be decrypted) and anyone can generate your pin on the leaked site (don't know how to hash this)</li>
              <li>Generic dangers
                <ul>
                  <li><s>key logging</s>(caveat is the initial equation can be, simple equations could potentially be reversed engineered)</li>
                  <li>phished info?(should in theory be harder for someone to phish for equations)</li>
                  <li><s>visual discovery</s>(caveat same as above)</li>
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
        <v-card class="ma-2 about">
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
        <v-row>
          <v-col cols="12">
            <v-card class="ma-2">
              <v-card-title>Pin Equation</v-card-title>
              <v-container>
                <v-text-field v-model="equation" label="Equation" title="See grammar above" @keyup="checkEquation()"></v-text-field>
                <div v-if="invalidEquation">{{error}}</div>
                <v-btn depressed color="primary" @click="resetEquation()" class="mr-2">
                  Reset
                </v-btn>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Show Password
                    </v-btn>
                  </template>
                  <span>{{actualPin}}</span>
                </v-tooltip>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="ma-2">
              <v-container>
                <pre class="mono about">
                      AB:EF
                  MIL {{milHours}}:{{minutes}} {{seconds}}
                      CD:EF
                  STD {{stdHours}}:{{minutes}} {{seconds}} {{milHours<12?'AM':'PM'}}
                      GH/IJ/KLMN
                  STD {{month}}/{{day}}/{{year}}
                </pre>
                <span>Test your equation</span>
                <v-text-field label="Test Password" v-model="pinTest" title="Comma separated pin"/>
                <span>{{ validResult ? 'VALID' : 'INVALID' }}</span>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
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
      pins: [],
      seconds:'00',
      minutes: '00',
      hours: 0,
      date: new Date(),
      pinTest: ''
    }),
    created(){
      // this.generator = setInterval(()=>this.generateTOTP(), 1000);
      this.intervalSec = setInterval(() => {
        // Concise way to format time according to system locale.
        // In my case this returns "3:48:00 am"
        this.date=new Date()
        this.seconds = `${this.date.getSeconds().toString().padStart(2,'0')}`
        this.minutes = `${(this.date.getMinutes()).toString().padStart(2,'0')}`
        this.hours = this.date.getHours()
      }, 1000)
      this.checkEquation()
    },
    computed: {
      milHours:function(){
        return `${this.hours.toString().padStart(2,'0')}`
      },
      stdHours:function(){
        return `${(this.hours>12?this.hours-12:this.hours).toString().padStart(2,'0')}`
      },
      day:function(){
        return `${this.date.getDate().toString().padStart(2,'0')}`
      },
      month:function(){
        return `${(this.date.getMonth()+1).toString().padStart(2,'0')}`
      },
      year:function(){
        return this.date.getFullYear()
      },
      validResult:function(){
        let input=this.pinTest.split(',')
        if(input.length!=this.pins.length){
          return false
        } else {
          let v=true
          input.forEach((num,idx)=>{
            if(parseInt(num) != this.pins[idx].value()){
              v = false
            }
          })
          return v
        }
      },
      actualPin:function(){
        return this.pins.map(p=>p.value()).join(',')
      }
    },
    methods: {
      resetEquation(){
        this.equation = '(A+B), (C-D), ((A * B) % 10), D'
      },
      checkEquation(){
        try{
          this.pins = this.equation.split(/,\s*/).map(p => new EQ(p))
          // this.pins.forEach((pin, idx) => {
          //   console.log(pin.toString(), pin.value())
          // })
          this.invalidEquation=false
        }catch(e){
          this.invalidEquation=true
          this.error=e
        }
      }
    }
  }
</script>
<style>
.about{
  text-align: left;
}
.mono{
  font-family: "Lucida Console", Courier, monospace;
}
</style>
