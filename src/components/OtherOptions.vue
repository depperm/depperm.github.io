<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="ma-2 about">
          <v-card-title>Other Options</v-card-title>
          <v-container>
            <h2>Ideas</h2>
            <ul>
            	<li>Complex Pin Pattern</li>
	            <li>Music Pin</li>
            </ul>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
          <v-card-title>Complex Pin Pattern</v-card-title>
          <v-container>
          	<p>
          		<img src="../assets/pattern-lock.png">
          		Only 389,112 possibilities with current pin restrictions because each pin can only be used once and the pin has to be at least 4 long (<a href="https://media.defcon.org/DEF%20CON%2023/DEF%20CON%2023%20presentations/DEF%20CON%2023%20-%20Marte-L0ge-I-will-Tell-you-your-Lock-Pattern-UPDATED.pdf" target="_blank">source</a> and <a href="https://sinustrom.info/2012/05/21/android-unlock-pattern-security-analysis/">source</a>)
          	</p>
          	<p>Other weaknesses include: smudge attacks (<a href="https://www.usenix.org/legacy/events/woot10/tech/full_papers/Aviv.pdf" target="_blank">source</a>) and common patterns (<a href="https://android.imyfone.com/remove-screen-lock/all-possible-android-unlock-patterns/?utm_source=CJ&utm_medium=Affiliate&utm_campaign=5250933&cjevent=456451fe854211ec81eedc6d0a82b836" target="_blank">source</a>)</p>
          	<p>
          		Why not allow more complexity/entropy
          		<ul>
	              <li>Allow dot revisit</li>
	              <li>Expand size of pattern AND/OR change shape</li>
          		</ul>
          	</p>
          </v-container>
        </v-card>
      </v-col>
      <v-col sm="12" md="6">
        <v-card class="ma-2">
        	<v-card-title>Music Pin</v-card-title>
          <v-container>
            <p>
          		<img src="../assets/music-pin.PNG">
            </p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {

    data: () => ({
    }),
    methods: {
    }
  }
</script>
<style>
.about{
  text-align: left;
}
</style>
