/**
 * Created by Administrator on 2016/5/29.
 */
var CentralDispatcher = require("scripts/checkbox/dispatcher/CentralDispatcher"),
    Const = require("scripts/checkbox/const/Const"),
    EventEmitter = require("events").EventEmitter,
    assign = require("object-assign"),
    CHANGE_EVENT = "change",
    store = {};

/**处理状态*/
var checkboxDeal = {
    create: function(props) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        store.checkbox[id] = assign({id: id}, props);
    },
    initial: function() {
        store.checkbox = {};
        this.create({isChecked: false, isFirst: true});
        this.create({isChecked: false, isFirst: false});
        this.create({isChecked: false, isFirst: false});
        this.create({isChecked: false, isFirst: false});
    },
    checkboxAll: function(checked) {
        var first = null;
        for (var key in store.checkbox) {
            if (store.checkbox[key].isFirst) {
                first = store.checkbox[key];
                first.isChecked = checked;
                break;
            }
        }
        for (key in store.checkbox) {
            if (!store.checkbox[key].isFirst) {
                store.checkbox[key].isChecked = first.isChecked;
            }
        }
    },
    checkboxSingle: function(id, checked) {
        for (var key in store.checkbox) {
            if (key == id) {
                store.checkbox[key].isChecked = checked;
                break;
            }
        }
    },
    btnAll: function() {
        for (var key in store.checkbox) {
            store.checkbox[key].isChecked = true;
        }
    },
    btnReverse: function() {
        for (var key in store.checkbox) {
            if (!store.checkbox[key].isFirst) {
                store.checkbox[key].isChecked = !store.checkbox[key].isChecked;
            }
        }
    }
};

/**状态机*/
var StorePublic = assign({}, EventEmitter.prototype, {
    /**获取初始化状态*/
    getInitStore: function() {
        checkboxDeal.initial();

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
        case Const.CHECKBOX_ALL:
            checkboxDeal.checkboxAll(action.checked);

            StorePublic.emitChange();
            break;
        case Const.CHECKBOX_SINGLE:
            checkboxDeal.checkboxSingle(action.id, action.checked);

            StorePublic.emitChange();
            break;
        case Const.BTN_ALL:
            checkboxDeal.btnAll();

            StorePublic.emitChange();
            break;
        case Const.BTN_REVERSE:
            checkboxDeal.btnReverse();

            StorePublic.emitChange();
            break;
    }
});

module.exports = StorePublic;