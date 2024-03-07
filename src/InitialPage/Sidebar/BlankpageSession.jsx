import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../custom/supabaseClient';

const BlankPage = () => {
    // State to store user details and profile details
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    // Function to fetch user profile details
    const fetchUserProfile = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error.message);
        } else {
            console.log('User profile:', data);
            setProfile(data); // Save user profile in state
            sessionStorage.setItem('userProfile', JSON.stringify(data)); // Store profile data in session storage
        }
    };

    // Function to handle sign-in
    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'user@qintez.app',
            password: '123456',
        });

        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            console.log('User signed in:', data.user);
            setUser(data.user); // Save user details in state
            fetchUserProfile(data.user.id); // Fetch and save user profile details
            
        }
    };

    // Effect to listen for auth changes
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                console.log('User signed in:', session.user);
                setUser(session.user); // Update user details in state
                fetchUserProfile(session.user.id); // Fetch and save user profile details
            } else if (event === 'SIGNED_OUT') {
                console.log('User signed out');
                setUser(null); // Clear user details from state
                setProfile(null); // Clear user profile details from state
            }
        });

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return(
        <>
            <div className="page-wrapper pagehead">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Blank Page</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/dream-pos/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Blank Page</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {/* Show user details or a sign-in button */}
                            {user && profile ? (
                                <div>
                                    <div>Welcome, {user.email}</div>
                                    {/* Display additional profile details */}
                                    <div>Name: {profile.name}</div>
                                    {/* Add more profile details as needed */}
                                </div>
                            ) : (
                                <button onClick={handleSignIn}>Sign In</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlankPage;