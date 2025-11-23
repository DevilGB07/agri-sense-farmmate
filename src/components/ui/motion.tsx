import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export const FadeIn = ({ children, delay = 0, duration = 0.5, className = "" }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SlideUp = ({ children, delay = 0, duration = 0.5, className = "" }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: { children: ReactNode, className?: string, staggerDelay?: number }) => (
    <motion.div
        initial="hidden"
        animate="show"
        variants={{
            hidden: {},
            show: {
                transition: {
                    staggerChildren: staggerDelay
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
        }}
        className={className}
    >
        {children}
    </motion.div>
);
