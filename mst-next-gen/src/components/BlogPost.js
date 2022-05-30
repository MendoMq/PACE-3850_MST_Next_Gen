import React from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function BlogPost({ title, description, date, user, handleOpen, detail }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{moment(date).format("YYYY-MM-DD")}</p>
      {user?.role === "admin" &&
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="contained" color="primary" className="Blog_bt" onClick={() => handleOpen('edit', detail)}>Edit</Button>
          <Button variant="contained" color="primary" className="Blog_bt" onClick={() => handleOpen('delete', detail)}>Delete</Button>
        </ButtonGroup>
      }
    </div>
  );
}

export default BlogPost;