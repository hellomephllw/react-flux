/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    CascadeAction = require("scripts/cascade/action/CascadeAction");

var CityCpn = React.createClass({
    render: function() {
        var options = [];
        for (var key in this.props.cities) {
            var city = this.props.cities[key];
            options.push(<option key={key} value={key}>{city.text}</option>);
        }
        return (
            <select>
                {options}
            </select>
        );
    }
});

module.exports = CityCpn;