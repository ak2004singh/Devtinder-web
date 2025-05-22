// Feed.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import UserCard from './UserCard';

const swipeConfidenceThreshold = 100;

function SwipeableCard({ user, isTop, position, index, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);

  return (
    <motion.div
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        // <— ensure correct stacking order
        zIndex: index,
        // only top card gets motion values
        ...(isTop ? { x, rotate } : {}),
      }}
      onDragEnd={(e, { offset }) => {
        if (!isTop) return;
        if (offset.x > swipeConfidenceThreshold) onSwipe('like', user._id);
        else if (offset.x < -swipeConfidenceThreshold) onSwipe('ignore', user._id);
      }}
      initial={{ scale: 1 - position * 0.05, y: -position * 5 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{
        x: offset => (offset.x > 0 ? 500 : -500),
        opacity: 0,
        rotate: offset => (offset.x > 0 ? 20 : -20),
      }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 1.05 }}
      className="absolute"
    >
      <UserCard
        user={user}
        onLike={() => onSwipe('like', user._id)}
        onIgnore={() => onSwipe('ignore', user._id)}
      />
    </motion.div>
  );
}

export default function Feed() {
  const dispatch = useDispatch();
  const users = useSelector(store => store.feed?.users) || [];
  const [stack, setStack] = useState([]);
  const [swipeFeedback, setSwipeFeedback] = useState(null);
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

  const sendAction = async (action, userId) => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/${action}/${userId}`,
        {},
        { withCredentials: true }
      );
      setSwipeFeedback(action === 'interested' ? 'like' : 'ignore');
      setTimeout(() => setSwipeFeedback(null), 1000);
    } catch (err) {
      console.error(`Error sending ${action} to ${userId}:`, err);
    }
  };

  const onSwipe = (direction, userId) => {
    if (direction === 'like') sendAction('interested', userId);
    else if (direction === 'ignore') sendAction('rejected', userId);

    setStack(prev => prev.slice(0, -1));
    currentIndex.current -= 1;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Full-screen ❤️ / ❌ overlay */}
      {swipeFeedback && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-50">
          <motion.div
            key={swipeFeedback}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-white text-9xl"
          >
            {swipeFeedback === 'like' ? '❤️' : '❌'}
          </motion.div>
        </div>
      )}

      {/* Foreground */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col items-center my-10 relative">
          {/* Card Stack */}
          <div className="relative w-80 h-96">
            <AnimatePresence>
              {stack.map((user, idx) => {
                const isTop = idx === stack.length - 1;
                const position = stack.length - idx - 1;
                return (
                  <SwipeableCard
                    key={user._id}
                    user={user}
                    isTop={isTop}
                    position={position}
                    index={idx}             // <-- pass idx for zIndex
                    onSwipe={onSwipe}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {stack.length === 0 && (
            <div className="mt-4 text-gray-500 text-center">No more profiles</div>
          )}
        </div>
      </div>
    </div>
  );
}
