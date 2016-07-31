function getCount(counts, count) {

    counts.push({value: count, static: true});

    return counts;
}

function deleteNumber(array, index) {
    array.splice(index, 1);

    return array;
}

function getTrueNumber(counts) {
    const count = counts.filter(count => count.static === true).length;
    return count;
}

function modifyCount(counts, s,index) {
    counts[index].static = s;

    return counts;
}

module.exports = {
    getCount: getCount,
    getTrueNumber: getTrueNumber,
    modifyCount: modifyCount
}