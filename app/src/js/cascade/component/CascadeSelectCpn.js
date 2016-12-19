/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    CascadeAction = require("scripts/cascade/action/CascadeAction");

var SelectCpn = React.createClass({
    _onChangeProvince: function(e) {
        CascadeAction.changeProvince(e.target.value);
    },
    render: function() {
        var options = [],
            provinceId = null;
        for (var key in this.props.provinces) {
            var province = this.props.provinces[key];
            options.push(<option key={key} value={key}>{province.text}</option>);
            if (province.isSelected) provinceId = province.id;
        }
        return (
            <select value={provinceId} onChange={this._onChangeProvince}>
                {options}
            </select>
        );
    }
});

module.exports = SelectCpn;