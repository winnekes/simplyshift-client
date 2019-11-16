import React from 'react';

import { Button } from 'react-bootstrap';
export default function TemplateList(props) {
    const list = props.templates.map(template => {
        let isActive = false;
        if (template.id === props.selectedShift) {
            isActive = true;
        }

        return (
            <Button
                key={template.id}
                onClick={() => {
                    props.selectShift(template.id);
                }}
                active={isActive}
            >
                {template.title}
            </Button>
        );
    });
    return <div>{list}</div>;
}
