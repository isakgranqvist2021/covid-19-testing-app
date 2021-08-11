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
