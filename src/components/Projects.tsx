import React from 'react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => (
  <section className="bg-gray-900 py-12 text-white">
    <motion.h2
      className="text-2xl font-bold text-center"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      Projects
    </motion.h2>
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {[1, 2, 3].map((id) => (
        <motion.div
          key={id}
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: id * 0.2 }}
        >
          <h3 className="text-lg font-semibold">Project {id}</h3>
          <p className="text-sm mt-2">Description of project {id}.</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
