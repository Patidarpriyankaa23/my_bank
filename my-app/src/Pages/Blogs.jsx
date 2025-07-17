import React from 'react';
                                                                    
const Blogs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>
      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Understanding Your Credit Score</h2>
        <p>Learn how your credit score impacts your financial life...</p>
      </article>
      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Top 5 Tips for Saving Money</h2>
        <p>Discover practical ways to boost your savings every month...</p>
      </article>
      {/* Add more blog posts */}
    </div>
  );
};

export default Blogs;
