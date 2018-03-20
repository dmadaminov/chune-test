const urlifyPf = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://pitchfork.com/search/more/?query=${urlified}&filter=news`
}

const urlifyHnhh = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://www.hotnewhiphop.com/search/${urlified}/news/`
}

const urlifyBillboard = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `-${word}`
    })
    return `https://www.billboard.com/music/${urlified}/news`
}

module.exports = { urlifyBillboard, urlifyHnhh, urlifyPf }
