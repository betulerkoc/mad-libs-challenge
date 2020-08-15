
/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */


function parseStory(rawStory) {

  const output = [];
  const reg = /((?:[^\s]){1,}\[\w+\]),?/g;
  const reg2 = /(\[\w+\]),?/g;

  const individualWords = rawStory.split(' ');
 // console.log(individualWords);
  

  for(let i=0; i< individualWords.length; i++){
  
    let word = individualWords[i].split("[");
    let onlyWord = word[0];
    
    let objectOutput = {};
    objectOutput.word = onlyWord;

    if(individualWords[i].match(reg2) != null) {
      const result2 = individualWords[i].match(reg2);
    //  console.log(result2);
        let resultValue = result2[0][1];

        switch(resultValue){
          case "n": 
          objectOutput.pos = "noun";
          break;

          case "v": 
          objectOutput.pos = "verb";
          break;

          case "a": 
          objectOutput.pos = "adjective";
          break;

          case "p": 
          objectOutput.pos = "pronoun";
          break;
       }      
    }
    output.push(objectOutput);
   // console.log(objectOutput)     
  }  
    
 // console.log(output)
  return output; 
}



/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
   // console.log(processedStory);

  const madLibsEdit = document.querySelector(".madLibsEdit");
  const madLibsPreview = document.querySelector(".madLibsPreview");
 
    for(let i=0; i<processedStory.length; i++){
     if(!processedStory[i].pos) {
      if(processedStory[i].word.includes("\n")){
        const bre = document.createElement("br");
        const brp = document.createElement("br");
      
        madLibsEdit.appendChild(bre);
        madLibsPreview.appendChild(brp);
      }


      const spanEdit = document.createElement("span");
      const spanPre = document.createElement("span");

      const editNode = document.createTextNode(` ${processedStory[i].word} `);
      const preNode = document.createTextNode(` ${processedStory[i].word} `);

      spanEdit.appendChild(editNode);
      spanPre.appendChild(preNode);

      madLibsEdit.appendChild(spanEdit);
      madLibsPreview.appendChild(spanPre);
     
     } else {
        let inpt = document.createElement("input");
        inpt.setAttribute("type", "text");
        inpt.setAttribute("placeholder", `${processedStory[i].pos}`);
        inpt.addEventListener("keyup", function(){
          const inputValue = document.createTextNode(`${inpt.value}`)
          madLibsPreview.appendChild(inputValue);
        })
  
        madLibsEdit.appendChild(inpt);
     }
    }


  function enter(e){
      let inpts = document.querySelectorAll("input");

     for(let i = 0; i < inpts.length; i++){
  
      inpts[i].addEventListener("keyup", function(e){
        //console.log(e.key);
        if(inpts[i+1] && e.key === "Enter"){
          //e.preventDefault();
          inpts[i+1].focus();
        }else if(inpts[inpts.length-1] && e.key === "Enter"){
          inpts[0].focus();
         }
      });
     }
   }
   enter(); 
   
  });
