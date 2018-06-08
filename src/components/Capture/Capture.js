import React from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CaptureIcon from 'material-ui/svg-icons/image/add-a-photo';
import { getBase64, getImageDimension } from 'lib/base64';
import recognizeText, { mapResponse } from 'api/vision';
// eslint-disable-next-line
import baseMock from './base64';
// eslint-disable-next-line
import dataMock from './mock';
import { drawRectangle } from './canvas';
import './index.css';
export default class Capture extends React.Component {
    constructor() {
		super();
		this.state = {
            data: {},
            base64: null,
            text: '',
            fetching: false,
            scale: 1,
            words: [],
            indexStart: null,
            indexEnd: null,
        }
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
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.toggleFetching();
        recognizeText(base64)
            .then((data) => mapResponse(data, this.state.scale))
            .then((words) => {
                // words.forEach(({ boundingPoly: { vertices } }) =>
                    // drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
                this.setState({ words });
            })
            .finally(this.toggleFetching)
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

        const index = this.state.words.findIndex(findMatchingWord(canvasCoords));
        if (index > -1) {
            if (this.state.indexStart !== null) {
                this.setState({ indexEnd: index });
                drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
                this.state.words
                    .slice(this.state.indexStart, index)
                    .forEach(({ boundingPoly: { vertices } }) =>
                        drawRectangle(this.canvas, vertices, 3, '#00bcd4', '#00bcd47d'))

                const text = this.state.words
                    .slice(this.state.indexStart, index + 1)
                    .map(({ description }) => description)
                    .reduce((acc, next) =>
                        acc.slice(-1) === '-' ?
                            acc.slice(0, -1).concat(next) :
                            acc.length ? [acc, next].join(' ') : next, '')

                this.props.fillQuoteText(text);
                setTimeout(() => {
                    this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
                    // this.state.words
                    //     .forEach(({ boundingPoly: { vertices } }) =>
                    //         drawRectangle(this.canvas, vertices, 3, '#00bcd4'))
                    this.setState({
                        indexStart: null,
                        indexEnd: null,
                    })
                }, 1000)
                return;
            }

            if (!this.state.indexStart) {
                this.setState({ indexStart: index });
                drawRectangle(this.canvas, this.state.words[index].boundingPoly.vertices, 3, '#00bcd4', '#00bcd47d');
            }
        }
    }

    toggleFetching = () =>
        this.setState({ fetching: !this.state.fetching });

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '5px' }}>
                    {/* <label htmlFor="inputFile">Scan text from photo</label> */}
                    {this.state.fetching && <CircularProgress style={{margin: '0 5px'}}/>}
                    <RaisedButton
                        onClick={() => this.file.click()}
                        labelPosition="before"
                        label="Scan text from photo"
                        secondary={true}
                        fullWidth
                        icon={<CaptureIcon />}
                    >
                        <input type="file"
                            id="inputFile"
                            className="input-file"
                            ref={(dom) => this.file = dom}
                            accept="image/*"
                            onChange={this.handleImageChange}/>
                    </ RaisedButton>
                    {/* <IconButton
                        onClick={() => this.file.click()}
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 5px, rgba(0, 0, 0, 0.23) 0px 1px 10px',
                            borderRadius: '100%',
                            margin: '0 10px'
                        }}>

                        <CaptureIcon />
                    </IconButton> */}
                </div>
                <div style={{position: 'relative', padding: '0 10px 10px', maxWidth: 'var(--app-max-width)'}}>
                    {this.state.width ?
                        <p>To extract text, tap at the image on starting and ending word.</p> : ''}
                    <img
                        ref={(image) => this.image = image}
                        src={this.state.base64}
                        className="capture-image"
                        style={{ position: 'absolute', zIndex: '-1' }}/>
                    {this.state.width &&
                        <canvas
                            onClick={this.handleCanvasClick}
                            ref={(canvas) => this.canvas = canvas}
                            width={this.image.offsetWidth} height={this.image.offsetHeight}
                        />
                        }
                </div>
            </div>
        )
    }
}
