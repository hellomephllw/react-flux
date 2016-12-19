/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    MainAction = require("scripts/checkbox/action/MainAction");

var CheckboxSingleCpn = React.createClass({
    _onClickSingle: function(e) {
        MainAction.checkboxSingle(e.target.value, e.target.checked);
    },
    render: function() {
        var checkboxes = [];
        for (var key in this.props.checkbox) {
            var single = this.props.checkbox[key];
            if (!single.isFirst) {
                var divKey = key + "div";
                checkboxes.push(<div key={divKey}><input type="checkbox" key={key} value={key} checked={single.isChecked} onClick={this._onClickSingle}/></div>);
            }
        }
        return (
            <div>
                {checkboxes}
            </div>
        );
    }
});

module.exports = CheckboxSingleCpn;