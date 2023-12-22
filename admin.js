const{kafka} = require("./client")

async function init(){
    const admin  = kafka.admin();
    console.log("Connecting Admin...")
    admin.connect();
    console.log("Admin Connected!")

    console.log("creating topics")
    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2,
        },],
    });
    console.log("topic [rider-updates] created!")

    console.log("Disconnecting Admin")
    await admin.disconnect();
}

init();