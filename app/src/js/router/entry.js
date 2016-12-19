/**
 * Created by Administrator on 2016/5/30.
 */
var React = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router"),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,
    IndexLink = ReactRouter.IndexLink,
    Link = ReactRouter.Link;

var ACTIVE = {color: "red"};

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>APP!</h1>
                <ul>
                    <li><Link to="/" activeStyle={ACTIVE}>/</Link></li>
                    <li><IndexLink to="/" activeStyle={ACTIVE}>/IndexLink</IndexLink></li>

                    <li><Link to="/users" activeStyle={ACTIVE}>/users</Link></li>
                    <li><IndexLink to="/users" activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

                    <li><Link to="/users/ryan" activeStyle={ACTIVE}>/users/ryan</Link></li>
                    <li><Link to={{pathname: "/users/ryan", query: {foo: "bar"}}} activeStyle={ACTIVE}>/users/ryan?foo=bar</Link></li>

                    <li><Link to="/about" activeStyle={ACTIVE}>/about</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Index!</h2>
            </div>
        );
    }
});

var Users = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Users!</h2>
                {this.props.children}
            </div>
        );
    }
});

var UsersIndex = React.createClass({
    render: function() {
        return (
            <div>
                <h2>UsersIndex!</h2>
            </div>
        );
    }
});

var User = React.createClass({
    render: function() {
        return (
            <div>
                <h3>User {this.props.params.id}!</h3>
            </div>
        );
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div>
                <h2>About!</h2>
            </div>
        );
    }
});

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/about" component={About} />
            <Route path="users" component={Users} >
                <IndexRoute component={UsersIndex} />
                <Route path=":id" component={User} />
            </Route>
        </Route>
    </Router>
), document.getElementById("main"));