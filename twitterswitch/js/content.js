window.addEventListener('load', ()=>{
    document.addEventListener('scroll',()=>{twitterSWitch.catchTwits()})
    twitterSWitch.init();
});
const twitterSWitch ={
    init(){
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
                switch(data.to) {
                    case "text":
                        let textED ='';
                        data.incoming.forEach(h=>{
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
                        data.incoming.split('').forEach(t=>{
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
    catchTwits(){
        document.querySelectorAll('[data-testid="tweetText"] :not([data-visited="true"])').forEach(twt=>{
            twt.dataset.visited="true";
            twt.innerHTML=this.convert({ingredient: twt.innerHTML,from: this.ioTypes.text,to: this.ioTypes.hex})
        })
    }

};


