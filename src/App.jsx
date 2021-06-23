import React from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { SignIn, SignUp, HomePage, UserProfile, SavedPosts, PasswordChange } from './components';

const App = () => {

    const user = useSelector(state => state.user);
    // const [user, setUser] = useState(null);
    const { push } = useHistory();


    if(!user) return(
        <>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/:path" render={() => <Link to="/">Page not found (404)!</Link>} />
        </>
    );

    return(
        <Switch>
            <Route path="/home" exact render={() => <div>{push('/')}</div>} />
            <Route path="/profile" render={() => <div>{push(`/user/${user._id}`)}</div>} />
            <Route path="/user" exact render={() => <div>{push(`/user/${user._id}`)}</div>} />
            <Route path="/user/:id" component={UserProfile} />
            {/* <Route path="/post/:id" component={PostPage} /> */}
            <Route path="/saves" component={SavedPosts} />
            <Route path="/set" component={PasswordChange} />
            <Route path="/:path" render={() => <div>{push('/')}</div>} />
            <Route path="/" component={HomePage} />
        </Switch>
    );
};

export default App;