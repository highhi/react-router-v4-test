import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Next = ({ page }) => {
  return <Link to={`/news/${page + 1}`}>Next</Link>;
};

const Prev = ({ page }) => {
  return page <= 1 ? null : <Link to={`/news/${page - 1}`}>Prev</Link>;
};

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: this.props.page };
    console.log(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    const nextPage = Number(nextProps.page);
    if (this.props.page === nextPage) return;
    this.setState({ page: nextPage });
  }

  render() {

    return(
      <div>
        <Prev page={this.state.page} />
        <span> | </span>
        <Next page={this.state.page} />
      </div>
    );
  }
}
