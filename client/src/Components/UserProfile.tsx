import React from 'react';

type UserProfileProps = {
  user: {
    username: string;
    location: string;
    profilePicture: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.profilePicture} alt={`${user.username}'s Profile`} />
      <h3>{user.username}</h3>
      <p>Location: {user.location}</p>
    </div>
  );
};

export default UserProfile;

