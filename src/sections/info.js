import * as utils from "../utils.js";

const NOTES = [

	() => `Now you have permissions to edit this!
So so so so so cool

    _.-._
  /| | | |_
  || | | | |
  || | | | |
 _||   \`   \|
\\ \\ \`      ;
 \\ \\       |
  \\ \\     /
  | |    |
  | |    |
`,

	() => `This site is using vanilla js, pixi.js, html and css
Thank you pixi.js!

FUCK FRAMEWORKS!

      __   _
    _(  )_( )_
   (_   _    _)
  / /(_) (__)
 / / / / / /
/ / / / / /
`,

	() => `Randomness is kinda cool because randomness is beautiful :)
Even people are randomness... bad example

Good example:
${utils.randomString(30)}

  __  __
 /  \\/  \\
|        |
 \\      /
  \\    /
   '__'
`,

	() => `I've rewrote this site in vanilla js, because <b>NOW DEVELOPERS OF REACT, VUE and other frameworks MUST PAY ME TO USE THEIR FRAMEWORKS</b>

$$$

   ____  ____  ____
  /   / /   / /   /
 /-$-/ /-$-/ /-$-/ 
/___/ /___/ /___/  
`,

	() => `Check out my github! Maybe there is already something interesting...
<i>i lost my previous github account...</i>

<b>https://github.com/bbogdan-ov</b>

 /\\_/\\
( o.o )
 > ^ <
`,

	() => `There are also my other links... Check them out too!!

<b>vk:</b> vk.com/bbogdan_ov
<b>telegram:</b> tg.me/bbogan_ov
<b>discord:</b> @bogdan_ov

  .------.
 /        \\
|  ()  ()  |
| .      . |
 \\ '----' /
  '------'
`,

	() => `I use arch btw

       .
      /#\\
     /###\\
    /p^###\\
   /##P^q##\\
  /##(   )##\\
 /###P   q#,^\\
/P^         ^q\\
`,

	() => `<b>Q: How old are you?</b>
A: i'm 19!

<b>Q: What is your name?</b>
A: bogdan!

<b>Q: Where are you from?</b>
A: i'm from russia!

 ___
|   |
|   |
|   |
 |_|
  _
 (_)
`,

	() => `Crazy animated images became real with help of <b>ezgif.com</b>, <b>tenor.com</b> and <b>giphy.com</b>!
Gifs are sooo cool!

Sounds were taken from <b>myinstants.com</b>!

   _______ ____
  / ____(_) __/
 / / __/ / /_  
/ /_/ / / __/  
\\____/_/_/
`,

	() => `Check out WHITEY!

njwhitey.bandcamp.com

   _   __    __   __  ____  __________________
  / | / /_  / /  / /_/ / /_/ /_ __/_  __/ ___/
 /  |/ / /_/ /  / / / / __  /_//_  / / / __/
/_/|__/_____/  /_____/_/ /_/____/ /_/ /____/
`

]

export function initInfo() {
	const noteText = document.querySelector("#note-text");
	noteText.innerHTML = utils.randomItem(NOTES)();
}
