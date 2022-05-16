import React from 'react';

function BlogPost({title, description, date}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
}

export default BlogPost;