import React, { useEffect, useState } from 'react';

type UserProfileProps = {
  user: string
  };

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {

  const [time, setTime] = useState<string>("Morning")

  useEffect(()=>{
    const time = new Date(Date.now()).getHours()
    if (time >= 0 && time < 12) {
      setTime("Morning")
    }
    else if (time >= 12 && time <18) {
      setTime("Afternoon")
    }
    else {setTime("Evening")}

  },[])

  return (
    <div className="user-profile">
    <h3>{user? (`Good ${time}, ${user}`): (`Good ${time}`)}</h3>
    </div>
  );
};

export default UserProfile;

