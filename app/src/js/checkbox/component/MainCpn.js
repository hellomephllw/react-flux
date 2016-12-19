/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    Store = require("scripts/checkbox/store/Store"),
    CheckboxAllCpn = require("scripts/checkbox/component/checkboxAllCpn"),
    CheckboxSingleCpn = require("scripts/checkbox/component/checkboxSingleCpn"),
    BtnCpn = require("scripts/checkbox/component/btnCpn");

/**main组件*/
var MainCpn = React.createClass({
    /**初始化state*/
    getInitialState: function() {
        return Store.getInitStore();
    },
    /**装上DOM完成回调*/
    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },
    /**卸载DOM之前回调*/
    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);
    },
    /**渲染*/
    render: function() {
        return (
            <div>
                <CheckboxAllCpn checkbox={this.state.checkbox} />
                <CheckboxSingleCpn checkbox={this.state.checkbox} />
                <BtnCpn />
            </div>
        );
    },
    /**委托给store的回调*/
    _onChange: function() {
        this.setState(Store.getStore());
    }
});

module.exports = MainCpn;