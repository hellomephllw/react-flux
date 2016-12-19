/**
 * Created by Administrator on 2016/5/30.
 */
var koa = require("koa"),
    React = require("react"),
    ReactDOMServer = require("react-dom/server"),
    render = require("koa-ejs"),
    app = koa();
    //require('node-jsx').install({extension: ".js"});
    require("babel-core/register");

//var App = React.createFactory(require(__dirname + "/app/src/js/serverside/App.js"));

app.listen(3000);
console.info("web服务器在3000端口开启！");

render(app, {
    root: __dirname + "/app/src/views",
    layout: false,
    viewExt: "ejs"
});

app.use(function* () {
    //var Test = React.createClass({
    //    render: function() {
    //        return (<div>abc</div>);
    //    }
    //});

    var reactHtml = ReactDOMServer.renderToString(<div>haha</div>);
    console.info(1);

    yield this.render("serverSide", {
        reactOutput: reactHtml
    });
});