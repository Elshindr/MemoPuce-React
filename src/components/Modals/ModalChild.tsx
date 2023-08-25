import { useState } from "react";

const ModalChild = (props: any) => {

    const [questionValue, setQuestionValue] = useState<string>(props.valueQuestion || '');
    const [answerValue, setAnswerValue] = useState<string>(props.valueAnswer || '');

    return (<div className="modal-dialog" role="document">
        <div className="modal-content">

            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
            </div>

            <div className="modal-body">

                <form onSubmit={(event) => { props.handleClickForm(event); }}>

                    <div className="form-group form-outline mb-4">
                        <input
                            type="text"
                            id="formQust"
                            className="form-control"
                            ref={props.inputQst}
                            placeholder={props.placeholderQuestion}
                            value={questionValue}
                            onChange={(e) => setQuestionValue(e.target.value)}
                        />
                    </div>

                    <div className="form-group form-outline mb-4">
                        <input
                            type="text" 
                            id="formAsw" 
                            className="form-control" 
                            ref={props.inputAsw} 
                            placeholder={props.placeholderAnswer} 
                            value={answerValue}
                            onChange={(e) => setAnswerValue(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn color-main-btn btn-block mb-4">{props.btnText}</button>

                </form>

            </div>
        </div>
    </div>)
}

export default ModalChild;