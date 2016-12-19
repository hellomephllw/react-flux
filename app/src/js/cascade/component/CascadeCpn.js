/**
 * Created by Administrator on 2016/5/29.
 */
var React = require("react"),
    Store = require("scripts/cascade/store/CascadeStore"),
    CascadeSelectCpn = require("scripts/cascade/component/CascadeSelectCpn"),
    CityCpn = require("scripts/cascade/component/CascadeCityCpn");

/**级联*/
var CascadeCpn = React.createClass({
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
                <span>省：</span>
                <CascadeSelectCpn provinces={this.state.provinces} />
                <span>市：</span>
                <CityCpn cities={this.state.cities} />
            </div>
        );
    },
    /**委托给store的回调*/
    _onChange: function() {
        this.setState(Store.getStore());
    }
});

module.exports = CascadeCpn;