window.addEventListener('load',()=>{
    twitterSWitchPop.init();
})

const twitterSWitchPop = {
    init(){
        console.log('TwitterSWitch loaded and ready!')
        this.eventConnector();
    },
    eventConnector(){
        document.querySelectorAll('[name="dataConvertorOptions"]').forEach(option=>{
            option.addEventListener('click',()=>{
                let valueToSend = {
                    from:option.dataset.from,
                    to:option.dataset.to
                }
                this.sendDataToContent({action:'dataConversionDirections', value: valueToSend}).then(r=>r);
            })
        })
    },
    async sendDataToContent(request={action: 'test', value:'done!'}){
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        console.log(tab.id);
        const response = await chrome.tabs.sendMessage(tab.id, request);
        // do something with response here, not outside the function
        return response;
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(request);
    switch(request.action){
        case 'convertData':
            console.log(JSON.parse(request.action));
            break;
        default:
            console.log(request.value);
            break;
    }
    return true;
});
