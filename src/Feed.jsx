import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';

const swipeConfidenceThreshold = 100;

export default function Feed() {
  const dispatch = useDispatch();
  const users = useSelector(store => store.feed?.users) || [];
  const [stack, setStack] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
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

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const sendAction = async (action, userId) => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/${action}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (action === 'interested') showToast('🚀 Interested request sent!', 'success');
      else if (action === 'rejected') showToast('❌ Ignored.', 'error');
    } catch (err) {
      showToast(err.response?.data || `Failed to send ${action} request.`, 'error');
      console.error(`Error sending ${action} request to ${userId}:`, err);
    }
  };

  const onSwipe = (direction, userId) => {
    if (direction === 'like') {
      sendAction('interested', userId);
    } else if (direction === 'ignore') {
      sendAction('rejected', userId);
    }
    setStack(prev => prev.slice(0, -1));
    currentIndex.current -= 1;
  };
    
  return (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* Foreground */}
    <div className="relative z-10 p-6">
      {
        <div className="flex flex-col items-center my-10 relative">
      {/* Toast Notification */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] w-fit max-w-md">
        {toast.show && (
          <div
            className={`relative px-6 py-4 rounded-xl shadow-lg border backdrop-blur-lg flex items-center gap-4 animate-fade-in-up transition-all duration-300 ${
              toast.type === 'success'
                ? 'border-green-500/50 bg-gradient-to-r from-green-900/50 to-gray-900/50 text-green-300'
                : 'border-red-500/50 bg-gradient-to-r from-red-900/50 to-gray-900/50 text-red-300'
            }`}
          >
            <div className="text-2xl animate-bounce">{toast.type === 'success' ? '🚀' : '❌'}</div>
            <div className="text-sm sm:text-base font-medium">{toast.message}</div>
          </div>
        )}
      </div>

      {/* Swipeable Card Stack */}
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
        <div className="mt-4 text-gray-500 text-center">No more profiles</div>
      )}
    </div>
      }
    </div>
  </div>
);

 
}
