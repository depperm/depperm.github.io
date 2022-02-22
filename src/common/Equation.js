export default class EQ {
  constructor(input) {
    this.input = input
    input = input.replace(/ /g, '')
    if (input[0] == '(') {
      if(!this.input.match(/\)/g) || (this.input.match(/\(/g).length != this.input.match(/\)/g).length)){
        throw 'Non matching parenthesis'
      }
      let c = 1
      let end = null
      for (let i = 1; i < input.length; i++) {
        if (input[i] == '(') {
          c += 1
        } else if (c == 1 && '+-/%*'.includes(input[i])) {
          end = i;
          break
        } else if (input[i] == ')') {
          c -= 1
        }
      }
      this.op = input[end]
      if(!'+-/*%'.includes(this.op)){
        throw 'Invalid operator'
      }
      this.values = [new EQ(input.slice(1, end)), new EQ(input.slice(end + 1, input.length - 1))]
    } else {
      if(input.match(/\)/g)){
        throw 'Invalid end parenthesis'
      }else if(input.length === 1 && !input.match(/[A-N\d]/)){
        throw 'Invalid variable or single digit'
      }else if(input.length>1 && isNaN(input)){
        throw 'Invalid multi digit'
      }
      this.values = [input]
    }
  }
  toString() {
    return this.input
  }
  valid(num){
    return this.value() == num
  }
  value() {
    if (this.values.length == 1) {
      if (parseInt(this.values[0])) {
        return parseInt(this.values[0])
      } else if ('ABCDEFGHIJKLMN'.includes(this.values[0])) {
        let twelve = null
        switch (this.values[0]) {
          case 'A':
            return Math.floor((new Date().getHours()) / 10)
            break;
          case 'B':
            return Math.floor((new Date().getHours()) % 10)
            break;
          case 'C':
            twelve = (new Date().getHours())
            if (twelve > 12) {
              twelve -= 12
            }
            return Math.floor(twelve / 10)
            break;
          case 'D':
            twelve = (new Date().getHours())
            if (twelve > 12) {
              twelve -= 12
            }
            return Math.floor(twelve % 10)
            break;
          case 'E':
            return Math.floor((new Date().getMinutes()) / 10)
            break;
          case 'F':
            return (new Date().getMinutes()) % 10
            break;
          case 'G':
            return Math.floor(new Date().getMonth()+1/10)
            break;
          case 'H':
            return (new Date().getMonth()+1) % 10
            break;
          case 'I':
            return Math.floor(new Date().getDate() / 10)
            break;
          case 'J':
            return new Date().getDate() % 10
            break;
          case 'K':
            return Math.floor(new Date().getFullYear()/ 1000)
            break;
          case 'L':
            return Math.floor((new Date().getFullYear() % 1000)/100)
            break;
          case 'M':
            return Math.floor(((new Date().getFullYear() % 1000)%100)/10)
            break;
          case 'N':
            return ((new Date().getFullYear() % 1000)%100)%10
            break;
        }
      }
      return 0//shouldn't get here
    } else {
      let ans = 0
      switch (this.op) {
        case '+':
          ans = this.values[0].value() + this.values[1].value()
          break
        case '-':
          ans = this.values[0].value() - this.values[1].value()
          break
        case '*':
          ans = this.values[0].value() * this.values[1].value()
          break
        case '/':
          ans = this.values[0].value() / this.values[1].value()
          break
        case '%':
          ans = this.values[0].value() % this.values[1].value()
          break
      }
      if (ans < 0) {
        ans = Math.abs(ans)
      }
      if (Math.floor(ans) != ans) {
        ans = Math.round(ans)
      }
      return ans
    }
  }     
}
