/**
 * Created by Administrator on 2016/5/29.
 */
var CentralDispatcher = require("scripts/cascade/dispatcher/CentralDispatcher"),
    CascadeConst = require("scripts/cascade/const/CascadeConst");

/**Cascade action*/
var CascadeAction = {
    changeProvince: function(id) {
        CentralDispatcher.dispatch({
            actionType: CascadeConst.CHANGE_PROVINCE,
            id: id
        });
    }
};

module.exports = CascadeAction;