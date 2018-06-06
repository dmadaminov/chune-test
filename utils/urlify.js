const urlifyBillboard = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `-${word}`
    })
    return `https://www.billboard.com/music/${urlified}/news`
}

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

const urlifyTsis = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://thissongissick.com/search?q=${urlified}`
}

const urlifyEdms = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.edmsauce.com/?s=${urlified}`
}

const urlifyConsequence = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://consequenceofsound.net/?s=${urlified}`
}

const urlifyStereoGum = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.stereogum.com/?s=${urlified}`
}

const urlifyTinymt = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.tinymixtapes.com/?search=${urlified}`
}

const urlifyDancingA = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://dancingastronaut.com/?s=${urlified}`
}

const urlify2dope = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://2dopeboyz.com/?s=${urlified}`
}

const urlifyRapRadar = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://rapradar.com/?s=${urlified}`
}

const urlifyPopJus = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.popjustice.com/?s=${urlified}`
}

const urlifyMusicBlog = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://amusicblogyea.com/?s=${urlified}`
}

const urlifyAnr = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.anrfactory.com/?s=${urlified}`
}

const urlifyCaesar = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://www.caesarlivenloud.com/search?q=${urlified}`
}

const urlifyEdmNations = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://edmnations.com/?s=${urlified}`
}

const urlifyIndietronica = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://indietronica.org/?s=${urlified}`
}

const urlifyKings = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://kingsofar.com/?s=${urlified}`
}

const urlifyLive = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://livemusicblog.com/?s=${urlified}`
}

module.exports = {
    urlifyPf,
    urlifyHnhh,
    urlifyBillboard,
    urlifyTsis,
    urlifyEdms,
    urlifyConsequence,
    urlifyStereoGum,
    urlifyTinymt,
    urlifyDancingA,
    urlify2dope,
    urlifyRapRadar,
    urlifyPopJus,
    urlifyMusicBlog,
    urlifyAnr,
    urlifyCaesar,
    urlifyEdmNations,
    urlifyIndietronica,
    urlifyKings,
    urlifyLive
}
