import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { SignIn, SignUp, HomePage, UserProfile, SavedPosts, PostPage, PasswordChange } from './components';

const App = () => {

    const [user, setUser] = useState(null);
    const { push } = useHistory();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

    const authUser = userInfo => {
        if(userInfo){
            setUser(userInfo);
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
        } else {
            setUser(null);
            localStorage.removeItem('userInfo');
        }
        push('/');
    };

    if(!user) return(
        <>
            <Route path="/" exact component={SignIn.bind(this, { authUser })} />
            <Route path="/signup" exact component={SignUp.bind(this, { authUser })} />
            <Route path="/:path" render={() => <Link to="/">Page not found (404)!</Link>} />
        </>
    );

    return(
        <Switch>
            <Route path="/home" exact render={() => <div>{push('/')}</div>} />
            <Route path="/profile" render={() => <div>{push(`/user/${user._id}`)}</div>} />
            <Route path="/user" exact render={() => <div>{push(`/user/${user._id}`)}</div>} />
            <Route path="/user/:id" component={UserProfile.bind(this, { user })} />
            <Route path="/post/:id" component={PostPage.bind(this, { user })} />
            <Route path="/saves" component={SavedPosts.bind(this, { user })} />
            <Route path="/set" component={PasswordChange.bind(this, { user, authUser })} />
            <Route path="/:path" render={() => <div>{push('/')}</div>} />
            <Route path="/" component={HomePage.bind(this, { user, authUser })} />
        </Switch>
    );
};

export default App;