window.addEventListener('load', ()=>{
    twitterSWitch.init();
    // window.addEventListener('popstate', function (event) {
    //     // Log the state data to the console
    //     if(event.type === 'popstate'){
    //         console.log(event.state.state.previousPath);
    //     }
    // });
    let observedObject = document.body
    const observer = new MutationObserver(()=>{
        console.log('observer triggered');
    })
    observer.observe(observedObject,{subtree:true, childList:true})

});
const twitterSWitch ={
    dataConversion:{from:'hex', to:'text'},
    ioTypes:{
        hex:"hex",
        text:"text",
        morse:"morse"
    },
    init(){
        let checkFrequency = 100;
        let timeOut = 5000;
        let timeCounter=0;

        let checkToolBarLoaded = setInterval(()=>{
            if(timeCounter>timeOut){
                clearInterval(checkToolBarLoaded);
            }
            if(document.querySelector('div[data-testid="toolBar"]')){
                clearInterval(checkToolBarLoaded);
                twitterSWitch.activateHexButton();
            }
            console.log('iconlar bekleniyor...');

            timeCounter+=checkFrequency;
        },checkFrequency);

        let checkElementLoaded = setInterval(()=>{
            if(timeCounter>timeOut){
                clearInterval(checkToolBarLoaded);
            }
            if(document.querySelectorAll('[role="group"]').length>0){
                clearInterval(checkElementLoaded);
                twitterSWitch.catchTwits().then(r=>r)
            }
            // let mainColumn = document.querySelector('main[role="main"]');
            // const observer = new MutationObserver(()=>{
            //     console.log('observer triggered');
            //     twitterSWitch.activateHexButton();
            // })
            // observer.observe(mainColumn,{subtree:true, childList:true})
            console.log('tweetler bekleniyor...');
            timeCounter+=checkFrequency;
        },checkFrequency);



    },
    convert(data={ingredient:"default",from:this.ioTypes[this.dataConversion.from], to:this.ioTypes[this.dataConversion.to]}){
        let result='';
        switch(data.from) {
            case "hex":
                if(!this.isThisHex(data.ingredient.substring(0,2)) || !this.isThisHex(data.ingredient.substring(3,5))){
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
        //console.log(A,B);
        return A===B;
    },
    async catchTwits(){
        document.querySelectorAll('[data-testid="tweetText"]:not([data-visited="true"])').forEach(twt=>{
            twt.dataset.visited="true";
            twt.addEventListener('mouseover',(e)=>{
                if(twt.dataset.converted!=="true" && (this.isThisHex(twt.textContent.substring(0,2)) && this.isThisHex(twt.textContent.substring(3,5)))){
                    twt.textContent=this.convert({ingredient: twt.textContent,from: this.dataConversion.from,to: this.dataConversion.to});
                    console.log('Event triggered and conversion done!');
                    twt.dataset.converted="true";
                }
            })
        })
        return true;
    },
    async sendRequestToExtension(request={}){
            const response = await chrome.runtime.sendMessage(request);
            // do something with response here, not outside the function
            console.log(response);
    },
    activateHexButton(){
            let targetButtonDiv = document.querySelector('div[data-testid="geoButton"]');
            // console.log([...targetButtonDiv.classList]);
            // console.log(targetButtonDiv);
            let newButton = document.createElement('div');
            newButton.dataset.testId ="hexButton";
            newButton.id = "hexButton";
            newButton.setAttribute('role', 'button');
            newButton.setAttribute('aria-label', 'Convert To Hex');
            newButton.style.cursor='pointer';
            targetButtonDiv.classList.forEach(className=>newButton.classList.add(className));

            newButton.innerHTML =`<div dir="ltr" class="css-901oao r-1awozwy r-1cvl2hr r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"><svg fill=\"#69b2f7\" height=\"14px\" width=\"16px\" version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 490 490\" xml:space=\"preserve\" stroke=\"#69b2f7\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <path d=\"M122.5,34.031L0,245.001l122.5,210.968h245L490,245.001L367.5,34.031H122.5z M287.558,318.293h-85.116l-42.557-73.292 l42.557-73.292h85.116l42.557,73.292L287.558,318.293z\"></path> </g> </g></svg></div>`;
            targetButtonDiv.insertAdjacentElement('afterend',newButton);

            //console.log(newButton);
            document.getElementById('hexButton').addEventListener('mouseover',(e)=>{
                let target = e.target;
                while(target.id!=='hexButton'){
                    target=target.parentNode;
                }
                target.classList.replace('r-1niwhzg', 'r-1peqgm7');
            });
            document.getElementById('hexButton').addEventListener('mouseout',(e)=>{
                let target = e.target;
                while(target.id!=='hexButton'){
                    target=target.parentNode;
                }
                target.classList.replace('r-1peqgm7', 'r-1niwhzg');

            });
            document.getElementById('hexButton').addEventListener('click',(e)=>{
                console.log('Hex Button tiklandi')
                let target = e.target;
                while(target.id!=='hexButton'){
                    target=target.parentNode;
                }
                let targetTextArea = document.querySelector('.DraftEditor-root [data-testid="tweetTextarea_0"]');
                console.log(targetTextArea.textContent);
                let oldContext = targetTextArea.textContent;
                let hexedContext = this.convert({ingredient:targetTextArea.textContent, from:'text', to:'hex'});
                navigator.clipboard.writeText(hexedContext).then(r=>r);
                //--
                let range = new Range(); //range object
                range.setStartBefore(targetTextArea.querySelector(':first-child'));
                range.setEndAfter(targetTextArea.querySelector(':last-child'));
                let selected  = window.getSelection();
                selected.addRange(range);
                //--------
            })
    }

};

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log('FULL REQUEST:',request);
    switch(request.action){
        case 'dataConversionDirections':
            let val = request.value;
            console.log('val:',val);
            twitterSWitch.dataConversion.from=val.from;
            twitterSWitch.dataConversion.to=val.to;

            break;
        default:
            console.log(request.value);
            break;
    }
    return true;
});

