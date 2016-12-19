/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    MainAction = require("scripts/checkbox/action/MainAction");

var CheckBoxAllCpn = React.createClass({
    _onClickCheckboxAll: function(e) {
        MainAction.checkboxAll(e.target.checked);
    },
    render: function() {
        var first = null;
        for (var key in this.props.checkbox) {
            if (this.props.checkbox[key].isFirst) {
                first = this.props.checkbox[key];
            }
        }

        return (
            <input type="checkbox" checked={first.isChecked} onClick={this._onClickCheckboxAll} />
        );
    }
});

module.exports = CheckBoxAllCpn;