import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  placement = 'top',
  delay = 0.2 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Positioning and arrow styles
  const getPositionStyles = () => {
    switch(placement) {
      case 'top':
        return {
          tooltipPosition: { 
            bottom: '110%', 
            left: '50%', 
            translateX: '-50%' 
          },
          arrowClasses: 'bottom-[-6px] left-1/2 -translate-x-1/2 rotate-45 border-b border-r border-black bg-black',
          arrowStyle: { borderBottomColor: 'black' }
        };
      case 'bottom':
        return {
          tooltipPosition: { 
            top: '110%', 
            left: '50%', 
            translateX: '-50%' 
          },
          arrowClasses: 'top-[-6px] left-1/2 -translate-x-1/2 rotate-45 border-t border-l border-black bg-black',
          arrowStyle: { borderTopColor: 'black' }
        };
      case 'left':
        return {
          tooltipPosition: { 
            right: '110%', 
            top: '50%', 
            translateY: '-50%' 
          },
          arrowClasses: 'right-[-6px] top-1/2 -translate-y-1/2 rotate-45 border-r border-t border-black bg-black',
          arrowStyle: { borderRightColor: 'black' }
        };
      case 'right':
        return {
          tooltipPosition: { 
            left: '110%', 
            top: '50%', 
            translateY: '-50%' 
          },
          arrowClasses: 'left-[-6px] top-1/2 -translate-y-1/2 rotate-45 border-l border-b border-black bg-black',
          arrowStyle: { borderLeftColor: 'black' }
        };
    }
  };

  const { tooltipPosition, arrowClasses, arrowStyle } = getPositionStyles();

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              ...tooltipPosition 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...tooltipPosition 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              ...tooltipPosition 
            }}
            transition={{ 
              duration: delay,
              ease: "easeOut" 
            }}
            className="absolute z-50 bg-black text-white px-3 py-2 rounded-md text-sm shadow-lg"
            style={{
              transform: `translate(${tooltipPosition.translateX || 0}, ${tooltipPosition.translateY || 0})`
            }}
          >
            {content}
            {/* Tiny arrow */}
            <div 
              className={`absolute w-3 h-3 border ${arrowClasses}`}
              style={arrowStyle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;