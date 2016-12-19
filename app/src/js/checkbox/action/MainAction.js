/**
 * Created by Administrator on 2016/5/29.
 */
var CentralDispatcher = require("scripts/checkbox/dispatcher/CentralDispatcher"),
    Const = require("scripts/checkbox/const/Const");

/**Main action*/
var MainAction = {
    checkboxAll: function(checked) {
        CentralDispatcher.dispatch({
            actionType: Const.CHECKBOX_ALL,
            checked: checked
        });
    },
    checkboxSingle: function(id, checked) {
        CentralDispatcher.dispatch({
            actionType: Const.CHECKBOX_SINGLE,
            id: id,
            checked: checked
        });
    },
    btnAll: function() {
        CentralDispatcher.dispatch({
            actionType: Const.BTN_ALL
        });
    },
    btnReverse: function() {
        CentralDispatcher.dispatch({
            actionType: Const.BTN_REVERSE
        });
    }
};

module.exports = MainAction;