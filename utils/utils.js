//变复数
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + "s"
}

export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    //3600 = 60*60 = 1小时
    if (between < 3600) {
        return pluralize(~~(between / 60), " minute")
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), " hour")
    } else {
        return pluralize(~~(between / 86400), " day")
    }
}
