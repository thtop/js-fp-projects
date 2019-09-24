const MSGS = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT'
}

export const addMsg = {
    type: MSGS.ADD
};

export const subtractMsg = {
    type: MSGS.SUBTRACT
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.ADD: {
            return model + 1;
        }
        case MSGS.SUBTRACT: {
            return model - 1;
        }
        default:
            return model;
    }
}

export default update;