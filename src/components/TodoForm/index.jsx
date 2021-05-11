import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,

}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        console.log('e = ', e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        //prevent reload browser
        e.preventDefault();
        if (onSubmit == null) return;
        const formValue = {
            title: value,
        };
        onSubmit(formValue);
        //reset form
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type={Text} value={value} onChange={handleValueChange} />
        </form>
    );
}

export default TodoForm;