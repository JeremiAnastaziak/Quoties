import React from 'react';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import { getBase64, getImageDimension } from 'lib/base64';
import recognizeText, { mapResponse } from 'api/vision';
import baseMock from './base64';
import dataMock from './mock';
import { drawRectangle } from './canvas';

export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
            data: dataMock,
            base64: baseMock,
            text: '',
            fetching: false,
            scale: 1,
            words: []
        }
    }

    componentDidMount() {

    }

    handleImageChange = async ({ target: { files } }) => {
        const base64 = await getBase64(files[0]);
        const { width, height } = await getImageDimension(files[0]);

        this.setState({
            scale: this.image.offsetWidth / width,
            base64,
            width,
            height
        });

        const words = mapResponse(this.state.data, this.state.scale);
        this.setState({ words });

        this.state.words.forEach(({ boundingPoly: { vertices } }) =>
            drawRectangle(this.canvas, vertices, 3, '#00bcd4'))

        // this.toggleFetching();
        // recognizeText(base64)
        //     .then(Capture.handleResponse)
        //     .finally(this.toggleFetching)
    }

    handleCanvasClick = ({ clientX, clientY, pageX, pageY }) => {
        const { top: canvasTop, left: canvasLeft } = this.canvas.getBoundingClientRect();
        const canvasCoords = {
            x: clientX - canvasLeft,
            y: clientY - canvasTop,
        }

        const findMatchingWord = (cords) =>
            ({ boundingPoly: { vertices }, description }) =>
                vertices[0].x < cords.x &&
                vertices[1].x > cords.x &&
                vertices[0].y < cords.y &&
                vertices[2].y > cords.y

        const index = this.state.words.findIndex(findMatchingWord(canvasCoords))
        if (index && !this.state.indexStart) {
            this.setState({ indexStart: index });
            drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
        }
        if (index && this.state.indexStart) {
            this.setState({ indexEnd: index });
            drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
            this.state.words
                .slice(this.state.indexStart, index)
                .forEach(({ boundingPoly: { vertices } }) =>
                    drawRectangle(this.canvas, vertices, 3, '#00bcd4', '#00bcd47d'))

            const text = this.state.words
                .slice(this.state.indexStart, index + 1)
                .map(({ description }) => description)
                .join(' ')

            this.props.fillQuoteText(text);

        }

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
                            onChange={this.handleImageChange}/>
                        <CaptureIcon />
                    </IconButton>
                </div>
                <div style={{position: 'relative'}}>
                    <img
                        ref={(image) => this.image = image}
                        src={this.state.base64}
                        style={{ position: 'absolute', zIndex: '-1', width: '100vw' }}/>
                    {this.state.width && <canvas
                        onClick={this.handleCanvasClick}
                        ref={(canvas) => this.canvas = canvas}
                        width={this.image.offsetWidth} height={this.image.offsetHeight}
                    />}
                </div>
            </div>
        )
    }
}
