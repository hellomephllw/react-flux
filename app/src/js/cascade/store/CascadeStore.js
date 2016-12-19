/**
 * Created by Administrator on 2016/5/29.
 */
var CentralDispatcher = require("scripts/cascade/dispatcher/CentralDispatcher"),
    CascadeConst = require("scripts/cascade/const/CascadeConst"),
    EventEmitter = require("events").EventEmitter,
    assign = require("object-assign"),
    CHANGE_EVENT = "change",
    store = {};

/**处理省状态*/
var provinceDeal = {
    create: function(props) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        store.provinces[id] = assign({id: id}, props);
    },
    initial: function() {
        store.provinces = {};
        this.create({text: "四川", isSelected: true});
        this.create({text: "北京", isSelected: false});
        this.create({text: "广东", isSelected: false});
    },
    change: function(id) {
        for (var key in store.provinces) {
            store.provinces[key].isSelected = false;
        }
        store.provinces[id].isSelected = true;
    }
};

/**处理市状态*/
var cityDeal = {
    cache: {},
    create: function(props) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        this.cache[id] = assign({id: id}, props);
    },
    initial: function() {
        this.cache = {};
        this.create({text: "成都", provinceText: "四川"});
        this.create({text: "资阳", provinceText: "四川"});
        this.create({text: "内江", provinceText: "四川"});
        this.create({text: "丰台区", provinceText: "北京"});
        this.create({text: "海淀区", provinceText: "北京"});
        this.create({text: "朝阳区", provinceText: "北京"});
        this.create({text: "广州", provinceText: "广东"});
        this.create({text: "深圳", provinceText: "广东"});
        this.create({text: "中山", provinceText: "广东"});
        this.confirmProvince();
    },
    confirmProvince: function() {
        store.cities = {};
        var province = null;
        for (var key in store.provinces) {
            if (store.provinces[key].isSelected) {
                province = store.provinces[key];
                break;
            }
        }
        for (key in this.cache) {
            if (this.cache[key].provinceText == province.text) {
                store.cities[key] = this.cache[key];
            }
        }
    }
};

/**Cascade状态机*/
var Store = assign({}, EventEmitter.prototype, {
    /**获取初始化状态*/
    getInitStore: function() {
        provinceDeal.initial();
        cityDeal.initial();

        return store;
    },
    /**获取状态*/
    getStore: function() {

        return store;
    },
    /**执行事件*/
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    /**注册事件监听器*/
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    /**移除事件监听器*/
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

/**为dispatcher注册回调*/
CentralDispatcher.register(function(action) {
    switch (action.actionType) {
        case CascadeConst.CHANGE_PROVINCE:
            provinceDeal.change(action.id);
            cityDeal.confirmProvince();

            Store.emitChange();
            break;
    }
});

module.exports = Store;