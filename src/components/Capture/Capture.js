import React from 'react';
import getBase64 from 'lib/base64';
import recognizeText from 'api/vision';

export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
			data: { responses: [ { textAnnotations: [] } ] },
        }
        this.canvas = React.createRef();
    }

    // static ctx = this.canvas.getContext("2d");

    handleImage = ({ target: { files } }) => {
        console.log(this.canvas);
        // this.ctx.drawImage(files[0], 10, 10)
        // getBase64(files[0])
        //     .then(recognizeText)
        //     .then(this.displayResponse)
        //     .catch(console.log)
    }

    displayResponse = (data) => {
        this.setState({ data });
    }

    render() {

        return (
            <div>
                <input type="file" accept="image/*" onChange={this.handleImage}/>
                <pre>
                    { JSON.stringify(this.state.data.responses[0].textAnnotations, null, 2) }
                </pre>
                <canvas id="canvas" ref={this.canvas}>

                </canvas>
            </div>
        )
    }
}
