window.addEventListener('load', ()=>{
    document.addEventListener('scroll',()=>{twitterSWitch.catchTwits()})
    twitterSWitch.init();
});
const twitterSWitch ={
    init(){
        this.catchTwits();
    },
    ioTypes:{
        hex:"hex",
        text:"text",
        morse:"morse"
    },
    convert(data={ingredient:"default",from:this.ioTypes.hex, to:this.ioTypes.text}){
        let result='';
        switch(data.from) {
            case "hex":
                if(!this.isThisHex(data.ingredient.substring(0,2))){
                    result = data.ingredient;
                    console.log('it is not a hex string');
                    break;
                }
                switch(data.to) {
                    case "text":
                        let textED ='';
                            let hexED = data.ingredient.split(' ');
                            //console.log(hexED);
                            hexED.forEach(h=>{
                                    textED+=String.fromCharCode(parseInt(h, 16));
                            })
                            result = textED;


                        break;
                }
                break;
            case "text":
                switch(data.to) {
                    case "hex":
                        let txtHex =[];
                        data.ingredient.split('').forEach(t=>{
                            txtHex.push(t.charCodeAt(0).toString(16));
                        })

                        let hexED = txtHex.join(' ');
                        result = hexED;
                        break;
                }
                break;
        }
        return result;
    },
    isThisHex(testThis){
        let A = parseInt(testThis,16).toString(16);
        let B = testThis.toLowerCase();
        console.log(A,B);
        return A===B;
    },
    catchTwits(){
        document.querySelectorAll('[data-testid="tweetText"] :not([data-visited="true"])').forEach(twt=>{
            twt.dataset.visited="true";
            //twt.innerHTML=this.convert({ingredient: twt.innerHTML,from: this.ioTypes.text,to: this.ioTypes.hex})
            twt.style.cursor="pointer";
            twt.title = "Use CTRL+click to convert hex to text on this tweet.";
            twt.addEventListener("click",(e)=>{
                if(e.ctrlKey && twt.dataset.hexed!=="true"){
                    twt.innerHTML=this.convert({ingredient: twt.textContent,from: this.ioTypes.hex,to: this.ioTypes.text})
                    twt.dataset.hexed="true";
                }
            })
        })
    }

};


