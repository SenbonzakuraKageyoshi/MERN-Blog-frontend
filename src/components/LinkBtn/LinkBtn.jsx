import React from 'react';
import { Link } from 'react-router-dom';
import './linkBtn.css'

const LinkBtn = ({name, to, type}) => {
    return (
        <Link to={to} className={`${type}-link`}>{name}</Link>
    );
}

export default LinkBtn;
