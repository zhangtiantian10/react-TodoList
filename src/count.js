function getTodoLists(counts, count, index) {
    counts.push({value: count, static: true, index: index});

    return counts;
}

function deleteCompleteThing(array, list) {
    let index;
    for(let i = 0; i< array.length; i++) {
        if(array[i].index === list.index) {
            index = i;
            break;
        }
    }

    array.splice(index, 1);

    return array;
}

function getTodoThings(counts) {
    const count = counts.filter(count => count.static === true).length;
    return count;
}

function modifyTodoList(counts,list) {
    let index;
    for(let i = 0; i< counts.length; i++) {
        if(counts[i].index === list.index) {
            index = i;
            break;
        }
    }
    counts[index].static = !list.static;

    return counts;
}

function filterCompletes(todoLists) {
    return todoLists.filter(list => !list.static);
}

function filterTodos(todoLists) {
    return todoLists.filter(list => list.static);
}

function deleteAllComplete(todolists) {
    const completes = todolists.filter(list => !list.static);

    completes.forEach(complete => {
        for(let i = 0; i < todolists.length; i++) {
            if(todolists[i].index === complete.index) {
                todolists.splice(i,1);
            }
        }
    });

    return todolists;
}

module.exports = {
    getTosoLists: getTodoLists,
    getTodoThings: getTodoThings,
    modifyTodolist: modifyTodoList,
    deleteCompleteThing: deleteCompleteThing,
    filterCompletes: filterCompletes,
    filterTodos: filterTodos,
    deleteAllComplete: deleteAllComplete
}