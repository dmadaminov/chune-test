const Dedup = require('../utils/articles/deduplication');

//TODO(geekonedge):
const duplicate_articles_should_succeed(a, b) {
    return true;
}

const non_duplicate_articles_should_succeed(a, b) {
    return true;
}

const empty_articles_should_fail(a, b) {
    return true;
}
