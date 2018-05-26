import React from 'react';
import IconButton from 'material-ui/IconButton';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import getBase64 from 'lib/base64';
import recognizeText from 'api/vision';

export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
            data: { responses: [ { textAnnotations: [] } ] },
            text: '',
        }
    }

    drawImage = (imageFile) => {
        const ctx = this.canvas.getContext('2d');
        const img = new Image;
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = URL.createObjectURL(imageFile);
    }

    handleImage = ({ target: { files } }) => {
        getBase64(files[0])
            .then(recognizeText)
            .then(this.displayResponse)
            .catch(console.log)
    }

    displayResponse = (data) => {
        const text = data.responses[0].textAnnotations[0].description;
        console.log(text);

        this.setState({ data, text });
        this.props.fillQuoteText(text)
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
                <IconButton
                    onClick={() => this.file.click()}
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 5px, rgba(0, 0, 0, 0.23) 0px 1px 10px',
                        borderRadius: '100%',
                        float: 'right',
                        marginRight: '10px'
                    }}>
                    <input type="file"
                        className="input-file"
                        ref={(dom) => this.file = dom}
                        accept="image/*"
                        onChange={this.handleImage}/>
                    {/* <Capture/> */}
                    <CaptureIcon />
                    {/* <textarea value={this.state.text}/> */}
                    {/* <pre>
                        { JSON.stringify(this.state.data.responses[0].textAnnotations, null, 2) }
                    </pre> */}

                    {/* <div style={{width: '100%', overflow: 'scroll'}}>
                        <canvas style={{ width: '200vw', height: 'auto' }}  id="canvas" ref={(form) => this.canvas = form} />
                    </div> */}
                </IconButton>
            </div>
        )
    }
}
