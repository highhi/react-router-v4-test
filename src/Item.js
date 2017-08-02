import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => (
  <li>
    <a href={props.url}>{props.title}</a><br />
    <Link to={props.commentsUrl}>comments</Link>
  </li>
);

export default Item;
