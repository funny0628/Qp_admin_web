import {SIZE_CHANGE} from "./mutationsType";

export default {
    [SIZE_CHANGE](state, val) {
        state.isPhone = val || false;
    }
}
