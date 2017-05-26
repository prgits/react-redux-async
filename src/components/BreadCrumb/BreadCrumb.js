import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class BreadCrumb extends Component {
  render() {
    require('./BreadCrumb.css');
    const { refreshClassName, items, loadPage } = this.props;
    // let refreshClassName = 'fa fa-refresh';
    // if (loading) {
    //   refreshClassName += 'fa fa-spin';
    // }
    console.log(items + 'fafdsf');
    return (
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <div className="btn-group btn-breadcrumb">
            <button className="btn btn-success btn-reload-page" onClick={loadPage}>
              <i className={refreshClassName}/> {' '} Refresh
            </button>
            <Link className="btn btn-success" to="/"><i className="glyphicon glyphicon-home"/>{' '}Home</Link>
            {items && items.length &&
              items.map((item, key) =>
                <Link className="btn btn-success" to={item.link} key={key + 1}>
                  {item.label}
                </Link>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
BreadCrumb.propTypes = {
  items: PropTypes.array,
  refreshClassName: PropTypes.string,
  loadPage: PropTypes.func.isRequired
};

BreadCrumb.defaultProps = {
  loadPage: function loadPage() {
    return false;
  }
};

