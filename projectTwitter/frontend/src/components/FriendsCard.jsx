import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { RiDeleteBin6Line } from "react-icons/ri";

const FriendsCard = ({ friends}) => {
  const handleDeleteFriend = (id) => {
    if (window.confirm("Are you sure you want to remove this friend?")) {
      // onDeleteFriend(id);
    }
  };

  return (
    <div>
      <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
        <div className='flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]'>
          <span> Friends</span>
          <span>{friends?.length}</span>
        </div>

        <div className='w-full flex flex-col gap-4 pt-4'>
          {friends?.map((friend) => (
            <div key={friend?._id} className='flex items-center gap-4'>
              <Link
                to={"/profile/" + friend?._id}
                className='w-full flex gap-4 items-center cursor-pointer'
              >
                <img
                  src={friend?.profileUrl ?? NoProfile}
                  alt={friend?.firstName}
                  className='w-10 h-10 object-cover rounded-full'
                />
                <div className='flex-1'>
                  <p className='text-base font-medium text-ascent-1'>
                    {friend?.firstName} {friend?.lastName}
                  </p>
                  <span className='text-sm text-ascent-2'>
                    {friend?.profession ?? "No Profession"}
                  </span>
                </div>
              </Link>

              {/* Delete button */}
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                // onClick={() => handleDeleteFriend(friend?._id)}
              >
                <RiDeleteBin6Line size={20} className='text-[#0f52b6]' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
