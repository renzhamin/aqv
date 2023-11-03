import { get_states, sleep } from "./data/helpers.js"
import countries from "./countries.json" assert { type: "json" }
import fs from "fs"

const tot_states = []
for (let ind = 0; ind < countries.length; ind++) {
    await sleep(10)
    const c = countries[ind]
    console.log("ON COUNTRY", ind)
    const states = await get_states(c).catch((err) => {
        console.log(err)
        return null
    })
    if (states) {
        states.forEach((state) => {
            tot_states.push({
                country: c,
                state,
            })
        })
        fs.writeFileSync(
            "./states.json",
            JSON.stringify(tot_states, null, 2),
            "utf-8"
        )
    } else {
        await sleep(10)
        ind = ind - 1
    }
}
