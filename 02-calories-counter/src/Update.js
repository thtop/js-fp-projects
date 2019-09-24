import * as R from 'ramda';

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    MEAL_INPUT: 'MEAL_INPUT',
    CALORIES_INPUT: 'CALORIES_INPUT',
    SAVE_MEAL: 'SAVE_MEAL',
    DELETE_MEAL: 'DELETE_MEAL',
    EDITE_MEAL: 'EDIT_MEAL'
}

export function showFormMsg(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    }
}

export function mealInputMsg(description) {
    return {
        type: MSGS.MEAL_INPUT,
        description
    }
}

export function caloriesInputMsg(calories) {
    return {
        type: MSGS.CALORIES_INPUT,
        calories
    }
}

export const saveMealMsg = {
    type: MSGS.SAVE_MEAL
}

export function deleteMealMsg(id) {
    return {
        type: MSGS.DELETE_MEAL,
        id
    }
}

export function editMealMsg(editId) {
    return {
        type: MSGS.EDIT_MEAL,
        editId
    }
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            const {
                showForm
            } = msg;
            return {
                ...model,
                showForm,
                description: '',
                calories: 0
            };
        }
        case MSGS.MEAL_INPUT: {
            const {
                description
            } = msg;
            return {
                ...model,
                description
            };
        }
        case MSGS.CALORIES_INPUT: {
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.calories);
            return {
                ...model,
                calories
            };
        }
        case MSGS.SAVE_MEAL: {
            const {
                editId
            } = model;
            const updatdModel = editId !== null ? edit(msg, model) : add(msg, model);
            return updatdModel;
        }
        case MSGS.DELETE_MEAL: {
            const {
                id
            } = msg;
            const meals = R.filter(meal => meal.id !== id, model.meals);
            return {
                ...model,
                meals
            };
        }
        case MSGS.EDIT_MEAL: {
            const {
                editId
            } = msg;
            const meal = R.find(meal => meal.id === editId, model.meals);
            const {
                description,
                calories
            } = meal;
            return {
                ...model,
                description,
                calories,
                showForm: true,
                editId
            }
        }
        default:
            return model;
    }
}

function add(msg, model) {
    const {
        nextId,
        description,
        calories
    } = model;
    const meal = {
        id: nextId,
        description,
        calories
    };
    const meals = [...model.meals, meal];

    return {
        ...model,
        meals,
        description: '',
        calories: 0,
        showForm: false,
        nextId: nextId + 1
    }
}

function edit(msg, model) {
    const {
        editId,
        description,
        calories
    } = model;
    const meals = R.map(meal => {
        if (meal.id === editId) {
            return {
                ...meal,
                description,
                calories
            };
        }
        return meal;
    }, model.meals);

    return {
        ...model,
        meals,
        description: '',
        calories: 0,
        showForm: false,
        editId: null
    }
}

export default update;