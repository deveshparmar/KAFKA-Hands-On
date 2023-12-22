const{kafka} = require("./client")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output:  process.stdout,
});

async function init(){
    const producer = kafka.producer();

    console.log("Connecting producer");
    await producer.connect();
    console.log("Producer Connected Successfully")

    rl.setPrompt("> ")
    rl.prompt();

    rl.on("line",async function(line){
        const[riderName,location] = line.split(" ")

        await producer.send({
            topic: "rider-updates",
            messages:[
                {
                    key: "Location-Update", 
                    value: JSON.stringify({name: riderName, location:location}),
                    partition: location.toLowerCase()==="north"?0:1,
                }
            ]
        });
    }).on("close",async()=>{
        await producer.disconnect();
    })
}

init();