function getTodoLists(counts, count) {

    counts.push({value: count, static: true});

    return counts;
}

function deleteCompleteThing(array, index) {
    array.splice(index, 1);

    return array;
}

function getTodoThings(counts) {
    const count = counts.filter(count => count.static === true).length;
    return count;
}

function modifyTodoList(counts, s, index) {
    counts[index].static = s;

    return counts;
}

function filterCompletes(todoLists) {
    return todoLists.filter(list => !list.static);
}

function filterTodos(todoLists) {
    return todoLists.filter(list => list.static);
}

module.exports = {
    getTosoLists: getTodoLists,
    getTodoThings: getTodoThings,
    modifyTodolist: modifyTodoList,
    deleteCompleteThing: deleteCompleteThing,
    filterCompletes: filterCompletes,
    filterTodos: filterTodos
}