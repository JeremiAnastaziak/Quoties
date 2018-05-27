import React from 'react';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import { getBase64, getImageDimension } from 'lib/base64';
import recognizeText from 'api/vision';
import baseMock from './base64';
import dataMock from './mock';

export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
            data: dataMock,
            base64: baseMock,
            text: '',
            fetching: false,
            scale: 1,
        }
    }

    componentDidMount() {

    }


    handleImage = async ({ target: { files } }) => {
        const base64 = await getBase64(files[0]);
        const { width, height } = await getImageDimension(files[0]);

        this.setState({ base64, width, height });

        Capture.drawRectangle = (vertices) => {
            const ctx = this.canvas.getContext("2d");
            ctx.rect(vertices[0].x, vertices[0].y, vertices[1].x - vertices[0].x, vertices[2].y - vertices[0].y);
            ctx.stroke();
        }

        Capture.handleResponse = ({ responses }) => {
            console.log(responses);
            responses[0].textAnnotations.slice(1).map(word => {
                Capture.drawRectangle(word.boundingPoly.vertices.map(({ x, y }) => ({
                        x: x * this.state.scale,
                        y: y * this.state.scale
                    })
                ))
            })
        }

        this.toggleFetching();
        recognizeText(base64)
            .then(Capture.handleResponse)
            .finally(this.toggleFetching)
    }

    toggleFetching = () =>
        this.setState({ fetching: !this.state.fetching });

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
                    {this.state.fetching && <CircularProgress />}
                    <IconButton
                        onClick={() => this.file.click()}
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 5px, rgba(0, 0, 0, 0.23) 0px 1px 10px',
                            borderRadius: '100%',
                            margin: '0 10px'
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
                <div style={{position: 'relative'}}>
                    <img
                        ref={(image) => this.image = image}
                        src={this.state.base64}
                        style={{ position: 'absolute', zIndex: '-1' }}/>
                    {this.state.width && <canvas
                        ref={(canvas) => this.canvas = canvas}
                        width={this.state.width} height={this.state.height}
                    />}
                </div>
            </div>
        )
    }
}
