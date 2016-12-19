/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    MainAction = require("scripts/checkbox/action/MainAction");

var BtnCpn = React.createClass({
    _onClickBtnAll: function() {
        MainAction.btnAll();
    },
    _onClickBtnReverse: function() {
        MainAction.btnReverse();
    },
    render: function() {
        return (
            <div>
                <button onClick={this._onClickBtnAll}>all</button>
                <button onClick={this._onClickBtnReverse}>reverse</button>
            </div>
        );
    }
});

module.exports = BtnCpn;