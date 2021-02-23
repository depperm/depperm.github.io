<template>
  <v-container>
    <v-row class="text-center">
      <v-card class="ma-2">
        <v-card-title>Token Gen Settings 1.24</v-card-title>
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
                prepend-icon="mdi-calendar"
                readonly=""
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
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
            label="Random salt"
            @click:append="showSalt = !showSalt"
          ></v-text-field>
          <v-select :items="tokenLengths" v-model="tokenLength" label="Token Length"></v-select>
          <v-select :items="hashTypes" v-model="hashType" label="Hash Type"></v-select>
          <v-select :items="tokenTimes" v-model="tokenTime" label="Token Period"></v-select>
        </v-container>
      </v-card>
      <v-card class="ma-2">
        <v-container>
          Token {{token}}
          <br/>
          <v-progress-circular :size="100" :width="15" color="green" :value="timeUntilChange*100">
            {{Math.round(tokenTime-timeUntilChangePercent)}}
            <br/>
            sec
          </v-progress-circular> until change
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  //reference:https://tools.ietf.org/html/rfc6238
  import crypto from 'crypto'
  export default {
    name: 'HelloWorld',

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
      timeUntilChange: .25,
      generator: null,
      tokenTime: 30,
      tokenTimes: [30,45,60]
    }),
    created(){
      this.generator = setInterval(()=>this.generateTOTP(), 1000);
    },
    computed: {
      timeUntilChangePercent:function(){
        return Math.round(this.timeUntilChange*this.tokenTime)
      }
    },
    methods: {
      generateTOTP(){
        let interval=this.tokenTime* 1000;//in seconds
        let time=new Date(this.tokenDate)
        //TODO logic date before today
        if((new Date()).getTime() > time)
          this.timeUntilChange=Math.abs(((new Date()).getTime()-time)/interval)%1
        else
          this.timeUntilChange=Math.abs((time-(new Date()).getTime())/interval)%1
        //console.log('time until change',(Math.abs(((new Date()).getTime()-time)/interval)%1).toString())
        let hash=crypto.createHmac(this.hashType, Buffer.from(this.tokenSalt).toString('hex')).update((Math.abs(Math.floor(((new Date()).getTime()-time)/interval))).toString()).digest('hex')
        console.log('hash:',hash)
        let offset = hash[hash.length-1] & 0xf;
        console.log(offset)
        let binary = ((hash[offset] & 0x7f) << 24) |
              ((hash[offset + 1] & 0xff) << 16) |
              ((hash[offset + 2] & 0xff) << 8) |
              (hash[offset + 3] & 0xff);
          
        let otp = binary % Math.pow(10,this.tokenLength)//this.DIGITS_POWER[returnDigits];
        this.token= otp.toString().padStart(this.tokenLength,'0')
        console.log('token:',this.token)
      },
      // regen(){
      //   clearInterval(this.generator)
      //   this.generator = setInterval(()=>this.generateTOTP(), 1000);
      // }
    }
  }
</script>
