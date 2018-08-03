
const urlify = (name, delimeter = "%20") => {
    return name.replace(" ", delimeter).toLowerCase(); 
}

const YOUREDM        = name => { return `https://www.youredm.com/tag/${urlify(name, "-")}`};
const PIGEON_PLANES  = name => { return `https://pigeonsandplanes.com/tag/${ urlify(name, "-") }/`};
const LOUDER_SOUND   = name => { return `https://www.loudersound.com/more/search/${urlify(name)}/1`};
const UCR            = name => { return `http://ultimateclassicrock.com/rest/carbon/api/searchfor/widgetsearch/?s=${urlify(name, '-')}&searchby=relevancy`};
const CMT            = name => { return `http://search.cmt.com/solr/cmt/select/?q=${urlify(name)}&wt=json`};

const Billboard = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `-${word}`
    })
    url = `https://www.billboard.com/music/${urlified}/news`
    return url;
}

const Pf = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://pitchfork.com/search/more/?query=${urlified}&filter=news`
}

const Hnhh = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://www.hotnewhiphop.com/search/${urlified}/news/`
}

const Tsis = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://thissongissick.com/search?q=${urlified}`
}

const Edms = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.edmsauce.com/?s=${urlified}`
}

const Consequence = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `%20${word}`
    })
    return `https://consequenceofsound.net/?s=${urlified}`
}

const StereoGum = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.stereogum.com/?s=${urlified}`
}

const Tinymt = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.tinymixtapes.com/?search=${urlified}`
}

const DancingA = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://dancingastronaut.com/?s=${urlified}`
}

const Twodope = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://2dopeboyz.com/?s=${urlified}`
}

const RapRadar = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://rapradar.com/?s=${urlified}`
}

const PopJus = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.popjustice.com/?s=${urlified}`
}

const MusicBlog = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://amusicblogyea.com/?s=${urlified}`
}

const Anr = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://www.anrfactory.com/?s=${urlified}`
}

const Caesar = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://www.caesarlivenloud.com/search?q=${urlified}`
}

const EdmNations = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://edmnations.com/?s=${urlified}`
}

const Indietronica = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://indietronica.org/?s=${urlified}`
}

const Kings = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `http://kingsofar.com/?s=${urlified}`
}

const Live = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://livemusicblog.com/?s=${urlified}`
}

module.exports = {
    Pf,
    Hnhh,
    Billboard,
    Tsis,
    Edms,
    Consequence,
    StereoGum,
    Tinymt,
    DancingA,
    Twodope,
    RapRadar,
    PopJus,
    MusicBlog,
    Anr,
    Caesar,
    EdmNations,
    Indietronica,
    Kings,
    Live,
    YOUREDM,
    PIGEON_PLANES,
    LOUDER_SOUND,
    UCR,
    CMT
}
