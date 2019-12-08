import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditorModal from './EditorModal';

export default function ShiftModels(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="shift-models">
            <h3>your models</h3>
            <p>Select a shift and assign it to the calendar.</p>
            <nav>
                {props.models.map(model => (
                    <>
                        <Button
                            name=""
                            key={model.id}
                            style={{
                                backgroundColor: model.color,
                            }}
                            onClick={() => {
                                props.onSelectModel(model);
                                setModalShow(true);
                            }}
                        >
                            {model.name}
                        </Button>
                    </>
                ))}
                <Button onClick={() => setModalShow(true)}>+</Button>
                <EditorModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    model={props.selectedModel}
                />
            </nav>
        </div>
    );
}
