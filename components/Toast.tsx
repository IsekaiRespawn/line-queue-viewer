import React from 'react'
import { motion } from 'framer-motion'

const Toast = () => {
    return (
        <motion.div
            className='fixed bottom-10 bg-green-400 p-4 rounded-xl'
            initial={{ opacity: 0, right: -1000 }}
            animate={{ opacity: 1, right: 40 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, right: -1000 }}
        >
            <h1 className='text-white text-sm font-bold'>Successfully created a data</h1>
        </motion.div>
    )
}

export default Toast