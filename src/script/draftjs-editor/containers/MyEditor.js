import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from "../actions/index";
import Toolbar from './Toolbar';
import Editable from './Editable';

class MyEditor extends React.Component {
    render() {
        const {toolbar, editable, actions} = this.props;

        return (
            <div className="card">
                <Toolbar
                    toolbar={toolbar}
                    editable={editable}
                    actions={actions}
                />
                <Editable
                    toolbar={toolbar}
                    editable={editable}
                    actions={actions}
                />
            </div>
        );
    }
}

MyEditor.propTypes = {
    toolbar: PropTypes.object.isRequired,
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    toolbar: state.toolbar,
    editable: state.editable
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyEditor);
