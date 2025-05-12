import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';

const swipeConfidenceThreshold = 100; // px

export default function Feed() {
  const dispatch = useDispatch();
  const users = useSelector(store => store.feed?.users) || [];
  const [stack, setStack] = useState([]);
  const currentIndex = useRef(stack.length - 1);

  useEffect(() => {
    if (!users.length) {
      axios
        .get('http://localhost:3000/user/feed', { withCredentials: true })
        .then(res => dispatch(addFeed(res.data)))
        .catch(console.error);
    } else {
      setStack(users);
      currentIndex.current = users.length - 1;
    }
  }, [dispatch, users]);

  const onSwipe = (direction, userId) => {
    // call your like/ignore API
    // axios.post(`/user/${direction}`, { userId });
    setStack(prev => prev.slice(0, -1));
    currentIndex.current -= 1;
  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className="relative w-80 h-96">
        <AnimatePresence>
          {stack.map((user, idx) => {
            const isTop = idx === stack.length - 1;
            return (
              <motion.div
                key={user._id}
                className="absolute"
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (!isTop) return;
                  if (offset.x > swipeConfidenceThreshold) {
                    onSwipe('like', user._id);
                  } else if (offset.x < -swipeConfidenceThreshold) {
                    onSwipe('ignore', user._id);
                  }
                }}
                initial={{ scale: 1 - (stack.length - idx) * 0.05, y: -(stack.length - idx) * 5 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ x: offset => (offset.x > 0 ? 500 : -500), opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 1.05 }}
              >
                <UserCard
                  user={user}
                  onLike={() => onSwipe('like', user._id)}
                  onIgnore={() => onSwipe('ignore', user._id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {stack.length === 0 && (
        <div className="mt-4 text-gray-500">No more profiles</div>
      )}
    </div>
  );
}
