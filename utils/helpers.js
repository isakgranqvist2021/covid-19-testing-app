import moment from "moment";
import momentTZ from "moment-timezone";

export function randId(n = 15) {
    let runes =
        "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789_".split(
            ""
        );

    let str = "";

    for (let i = 0; i < n; i++) {
        str += runes[Math.floor(Math.random() * runes.length)];
    }

    return str;
}

export function freshDate() {
    let d = moment(new Date()).subtract(1, "hours");
    return momentTZ.tz(d, "Europe/London");
}
