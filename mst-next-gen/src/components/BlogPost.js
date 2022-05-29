import React from 'react';
import moment from 'moment';
function BlogPost({title, description, date}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{moment(date).format("YYYY-MM-DD")}</p>
    </div>
  );
}

export default BlogPost;