<template>
	<v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="ma-2 about">
          <v-card-title>Markov Diceware</v-card-title>
          <v-container>
            <h2>What</h2>
            <p>A <a href="https://diceware.dmuth.org">diceware</a> that has a larger dictionary by expanding the diceware dictionary by implementing a <a href="https://setosa.io/ev/markov-chains/" target="_blank">Markov Chain</a>.</p>
            <h2>Why Use</h2>
            <ul>
              <li>Randomness is calculated with dictionary_size<sup>words_in_phrase</sup>. A normal diceware passphrase of 3 words (~15 characters long) with default dictionary of 8000 words has 8000<sup>3</sup>=512 billion possiblities. Comparatively a random password using 7 alphabet characters (lower and upper case) has 52<sup>7</sup>=~1028 billion possible passwords. Now while 512 billion sounds nice, a 7 character password which most would consider unsafe, has more possiblities. If a bruteforcer used a diceware dictionary they could potentially crack your password sooner than a 7 character password.
                <ul>
                  <li>If a user modifies the diceware in anyway it increases the complexity immensely (substitution, insertion, custom dictionary, etc)</li>
                </ul>
              </li>
            </ul>
            <h2>Benefits</h2>
            <ul>
              <li>Allow users to choose number of phrase, which dictionary (used here <a href="https://github.com/dmuth/diceware/blob/main/wordlist/wordlist-5-dice-eff.js">EFF</a>, <a href="https://theworld.com/~reinhold/beale.wordlist.asc">Beale</a>, <a href="https://theworld.com/~reinhold/diceware.wordlist.asc">Diceware</a>), and which roll to keep-near infinite possibilities</li>
              <li>Generate long passphrases that should be easier to remember than random digits</li>
            </ul>
            <h2>Problems/Risks</h2>
            <ul>
              <li>Some generated words will be completely weird(some diceware are this way too, to be fair)</li>
              <li>Generic dangers
                <ul>
                  <li>key logging</li>
                  <li>phished info</li>
                  <li>local discovery</li>
                </ul>
              </li>
            </ul>
            <h2>Further Development</h2>
            <ul>
              <li>NPM</li>
              <li>Browser extension</li>
              <li>PWA</li>
            </ul>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="pa-2">
          <v-container>
          	<v-row>
	            <v-text-field v-model="numWords" type="number" name="input-10-1" label="Number of Words"></v-text-field>
	            <v-text-field v-model="order" type="number" label="Markov Order" title="Higher generates more realistic words"></v-text-field>
	          </v-row>
            <v-select v-model="dictionary" :items="dictionaries" label="Dictionary"></v-select>
            <v-row justify="space-around">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-checkbox v-model="wholeDictionary" label="Use Whole Dictionary" v-on="on" v-bind="attrs" title="Default is to use min & max of dice rolls to generate markov chain"></v-checkbox>
                </template>
                <span>Unselected will only create a markov chain from words between the lowest and highest rolls (number of words).</span>
              </v-tooltip>
            	<v-btn depressed color="primary" @click="generatePassword()">
   						 Generate
  						</v-btn>
            </v-row>
            <v-row align="left">
	            <span>Passphrase:</span>
	            <strong class="ml-3">
	              {{passphrase}}
	            </strong>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  const dictA = require('../common/effDictionary')
  const dictB = require('../common/dicewareDictionary')
  const dictC = require('../common/bealeDictionary')

  export default {

    data: () => ({
    	numWords: 3,
    	wholeDictionary: false,
    	dictionary: 'EFF',
    	dicts: {
	    	'EFF':dictA.wordlist,
	    	'Diceware':dictB.wordlist,
	    	'Beale':dictC.wordlist
    	},
    	order:2,
    	passphrase:'',
    	rolls:[],
    	map:{}
    }),
    created(){
    	
    },
    computed: {
    	dictionaries: function(){
    		return Object.keys(this.dicts)
    	}
    },
    methods: {
    	generatePassword(){
    		let start, end
    		if(this.wholeDictionary){
    			start=0;
    			end=this.dicts[this.dictionary].length
    		}else{
					let rolls=[]

					for(let i=0;i<this.numWords;i++){
					  let roll=parseInt((Math.random() * ((Math.pow(6, 5)-1) + 1)), 10)//5 dice rolled
					  rolls.push(roll)
					}
					rolls.sort((a,b)=>a-b)
					start=rolls[0]
					end=rolls[rolls.length-1]
    		}
    		this.getWordsFromRange(start, end)
    	},
    	getWordsFromRange(start, end){
    		let maxWordLength=10
    		this.map={}
    		// generate map: theres probably a better way of doing this without regenerating it everytime
    		for (let i = start; i < end; i++) {
			    let word = this.dicts[this.dictionary][i]
			    for (let q = 0; q <= word.length; q++) {
			      let kfrom = q < this.order ? 0 : q - this.order;
			      let key = `${word.slice(kfrom, q)}`;

			      if (this.map.hasOwnProperty(key)) {
			        this.map[key].push(q == word.length ? '' : word[q])
			      } else {
			        this.map[key] = [q == word.length ? '' : word[q]]
			      }
			    }
			  }
	      //generate word
			  let exit = 0
			  let words=[]
			  for (let i = 0; i < this.numWords; i++) {
			    let newWord = ''
			    let nextChar = this.map[newWord][Math.floor(Math.random() * this.map[newWord].length)]
			    while (nextChar != '') {
			      newWord += nextChar
			      let kfrom = newWord.length < this.order ? 0 : newWord.length - this.order;
			      let key = `${newWord.slice(kfrom, kfrom + this.order)}`
			      nextChar = this.map[key][Math.floor(Math.random() * this.map[key].length)]
			      exit += 1
			      if (exit > maxWordLength) {
			        break
			      }
			    }
			    exit = 0
			    words.push(newWord)
			  }
			  this.passphrase = words.map(word=>`${word[0].toUpperCase()}${word.substr(1)}`).join('')
    	}
  	}
  }
</script>
<style>
.about{
	text-align: left;
}
</style>