<template>
  <v-container>
    <v-row class="text-center">
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
  import {webtotp, validate} from 'webtotp'

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
        let gen = webtotp(new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
        let gen2 = webtotp(new Date((new Date(this.tokenDate)).getTime() + (this.tokenTime * 1000)), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength)
        this.token = gen.token
        this.prevToken = gen2.token
        this.timeUntilChange = gen.timeUntilChange

        this.validateResult = validate(this.testToken, new Date(this.tokenDate), this.tokenSalt, this.tokenTime, this.hashType, this.tokenLength) ? 'VALID' : 'INVALID'
      }
    }
  }
</script>
